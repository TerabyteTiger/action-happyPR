const core = require("@actions/core");
const github = require("@actions/github");
const Sentiment = require("sentiment");

// List of gifs - should be 11 long so that every 1 increment of sentiment can have a unique gif.
// // These should be in order from -5 -> +5 (most negative mood to most positive)
const allGifs = [
  {
    // Link to gif
    link: "https://media.giphy.com/media/11tTNkNy1SdXGg/giphy.gif",
    // Alt text for gif
    alt: "Anger from Inside Out yellling and lighting his head on fire",
  },
  {
    link: "https://media.giphy.com/media/uDRezGbZW1uo0/giphy.gif",
    alt: "Nick Miller from New Girl bashing his face into a pillow repeatedly",
  },
  {
    link: "https://media.giphy.com/media/GjR6RPcURgiL6/giphy.gif",
    alt: "Man angrily chewing and glaring from inside his car",
  },
  {
    link: "https://media.giphy.com/media/sDC1GZxVBXSRW/giphy.gif",
    alt:
      "Nick Miller from New Girl singing 'It's miserable and magical. Oh yeah'",
  },
  {
    link: "https://media.giphy.com/media/fQoxwZBVWq5jhLXRty/giphy.gif",
    alt: "The Grinch saying 'Fine' with a slightly disappointed look",
  },
  {
    link: "https://media.giphy.com/media/RKS1pHGiUUZ2g/giphy.gif",
    alt: "Boo from Monsters Inc blinking and looking into space neutrally",
  },
  {
    link: "https://media.giphy.com/media/LMQgs60HFzAfdZYKtn/giphy.gif",
    alt: "Sonic the Hedgehog dancing and twirling",
  },
  {
    link: "https://media.giphy.com/media/rdma0nDFZMR32/giphy.gif",
    alt: "Pig holding a pinwheel while out the window excitedly",
  },
  {
    link: "https://media.giphy.com/media/11sBLVxNs7v6WA/giphy.gif",
    alt: "Minions cheering and clapping",
  },
  {
    link: "https://media.giphy.com/media/Oi6tJtKNThC6I/giphy.gif",
    alt: "Anna from Frozen being overjoyed",
  },
  {
    link: "https://media.giphy.com/media/3rgXBQBQyt98Dvh1sI/giphy.gif",
    alt:
      "Fairly  Odd Parents shaking maracas while confetti falls from the ceiling",
  },
];
async function run() {
  try {
    console.log("Context: ", github.context);
    const githubToken = core.getInput("GITHUB_TOKEN");
    const pullRequestNumber = github.context.payload.pull_request.number;
    const octokit = new github.getOctokit(githubToken);
    // Analyze the mood of the Pull Request's body
    let mood = new Sentiment();
    let result = mood.analyze(github.context.payload.pull_request.body);
    let resultIndex = Math.round(result.comparative + 5); // index of gif to look up
    console.log(result);
    let altText = allGifs[resultIndex].alt;
    let gif = allGifs[resultIndex].link;
    const message = `You're Pull Request scored a ${result.comparative} out of a possible +5 on the [sentiment scale](https://www.npmjs.com/package/sentiment). Here's a gif representation of your PR:
    ![${altText}](${gif})`;
    try {
      octokit.issues.createComment({
        repo: github.context.payload.repository.name,
        owner: github.context.payload.repository.owner.login,
        issue_number: pullRequestNumber,
        body: message,
      });
    } catch (error) {
      console.log("ERROR: ", error);
    }
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

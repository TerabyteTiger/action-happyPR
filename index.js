const core = require("@actions/core");
const github = require("@actions/github");
const Sentiment = require("sentiment");

async function run() {
  try {
    const githubToken = core.getInput("GITHUB_TOKEN");
    const pullRequestNumber = github.context.payload.pull_request.number;
    const octokit = new github.getOctokit(githubToken);
    // Analyze the mood of the Pull Request's body
    let mood = new Sentiment();
    let result = mood.analyze(github.context.payload.pull_request.body);
    const message = `MESSAGE GOES HERE! 🎉`;
    try {
      console.log("name: ", github.context.payload.repository.name);
      console.log("owner: ", github.context.payload.repository.owner);
      console.log("PR #:", pullRequestNumber);
      console.log("Message: ", message);
      octokit.issues.createComment({
        repo: github.context.payload.repository.name,
        owner: github.context.payload.repository.owner.login,
        issue_number: pullRequestNumber,
        body: message,
      });
    } catch (error) {
      console.log("ERROR: ", error);
    }
    // Logs for fun 🎉
    console.log(`Analysis: ${result.score}`);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

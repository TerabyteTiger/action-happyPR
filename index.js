const core = require("@actions/core");
const github = require("@actions/github");
const Sentiment = require("sentiment");

try {
  const githubToken = core.getInput("GITHUB_TOKEN");
  const pullRequestNumber = github.context.payload.pull_request.number;
  const octokit = new github.getOctokit(githubToken);
  // Analyze the mood of the Pull Request's body
  let mood = new Sentiment();
  let result = mood.analyze(github.context.payload.pull_request.body);
  const message = `MESSAGE GOES HERE! 🎉`;
  octokit.issues.createComment({
    repo: { ...github.context.repo },
    issue_number: pullRequestNumber,
    body: message,
  });
  // Logs for fun 🎉
  console.log(`Analysis: ${result.score}`);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}

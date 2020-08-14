const core = require("@actions/core");
const github = require("@actions/github");
const Sentiment = require("sentiment");

try {
  let mood = new Sentiment();
  // Analyze the mood of the Pull Request's body
  let result = mood.analyze(github.context.payload.pull_request.body);

  console.log(`Analysis: ${result.score}`);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}

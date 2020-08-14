const core = require("@actions/core");
const github = require("@actions/github");
const Sentiment = require("sentiment");

try {
  let mood = new Sentiment();
  let result = mood.analyze("test memo! :D");
  console.log(`Hello ${result}!`);
  const time = new Date().toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}

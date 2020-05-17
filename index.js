const core = require('@actions/core');
const github = require('@actions/github');
const MeiliSearch = require('meilisearch');

try {
  // `who-to-greet` input defined in action metadata file
  const key = core.getInput('key');
  const host = core.getInput('host');
  console.log(`Connecting to ${host}!`);

} catch (error) {
  core.setFailed(error.message);
}
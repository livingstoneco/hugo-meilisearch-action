const core = require('@actions/core');
const MeiliSearch = require('meilisearch');
var fs = require('fs');

const config = {
    host: core.getInput('host'),
    apiKey: core.getInput('key'),
}
var client = new MeiliSearch(config)

const index = {
  uid: core.getInput('indexName'),
}

const dataset = JSON.parse(fs.readFileSync('./docs/searchindex.json', 'utf8'));

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

;(async () => {
    const indexExists = await client.getIndex(index.uid) 
    if(indexExists !== undefined) { indexExists.deleteIndex(index.uid); }

    await client.createIndex(index)
    await client.getIndex(index.uid).addDocuments(dataset)
})()



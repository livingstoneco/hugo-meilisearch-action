const core = require('@actions/core');
const github = require('@actions/github');
const MeiliSearch = require('meilisearch');
var fs = require('fs');

;(async () => {
    try {
        const key = core.getInput('key')
        const host = core.getInput('host')
        const indexName = core.getInput('indexName')
    
        // Connect to MeiliSearch Instance
        console.log(`Connecting to ${host}:${indexName}!`)
        const client = new MeiliSearch({
            host: host,
            apiKey: key,
        })
    
        // Does index already exist, if so delete it
        let index = await client.listIndexes();
        index.forEach(function(item) {
            if(item.name == indexName) {
                let posts = await client.getIndex(indexName)
                posts.deleteIndex()
            }
        })
    
        index = await client.createIndex({ uid: indexName, primaryKey: 'id' })
        const searchIndex = await JSON.parse(fs.readFileSync('./docs/searchindex.json', 'utf8'));
        core.setOutput("index", searchIndex);
        console.log(searchIndex)
        const response = await index.addDocuments(searchIndex);
        core.setOutput("updateId", response);
        console.log(response)
    
    } catch (error) {
      core.setFailed(error.message);
    }    
});
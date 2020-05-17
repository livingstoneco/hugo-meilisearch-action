const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');
const MeiliSearch = require('meilisearch');
var fs = require('fs');

// ;(async () => {
    const ls = exec.exec('ls -la docs')
    console.log(ls)
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
        let index = client.listIndexes();
        index.forEach(function(item) {
            if(item.name == indexName) {
                let posts = client.getIndex(indexName)
                posts.deleteIndex()
            }
        })
    
        index = client.createIndex({ uid: indexName, primaryKey: 'id' })
        const searchIndex = JSON.parse(fs.readFileSync('./docs/searchindex.json', 'utf8'));
        console.log(searchIndex)
        const response = index.addDocuments(searchIndex);
        console.log(response)
    
    } catch (error) {
      core.setFailed(error.message);
    }    
// });
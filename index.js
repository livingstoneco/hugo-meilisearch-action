const core = require('@actions/core');
const github = require('@actions/github');
const MeiliSearch = require('meilisearch');

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
		if(item.name == 'posts') {
			let posts = client.getIndex('posts')
			posts.deleteIndex()
		}
	})

    const index = await client.createIndex({ uid: indexName, primaryKey: 'id' })
    const searchIndex = await JSON.parse(fs.readFileSync('./docs/searchindex.json', 'utf8'));
    const response = await index.addDocuments(searchIndex);
    console.log(response) // => { "updateId": 0 }

} catch (error) {
  core.setFailed(error.message);
}



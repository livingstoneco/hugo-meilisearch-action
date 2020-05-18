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

;(async () => {
	
	let index = await client.listIndexes();
	index.forEach(function(item) {
		if(item.name == index.uid) {
			let posts = client.getIndex(index.uid)
			posts.deleteIndex()
		}
	})
		

    await client.createIndex(index.uid)
    await client.getIndex(index.uid).addDocuments(dataset)
})()



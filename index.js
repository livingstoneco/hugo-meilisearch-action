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

const indexes = client.listIndexes()

indexes.then(function(data) {
	data.forEach(function(item) {
		if(item.uid === index.uid) {
			let posts = client.getIndex(item.uid)
			posts.deleteIndex()
			
		}
	})
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const dataset = JSON.parse(fs.readFileSync('./docs/searchindex.json', 'utf8'));

;(async () => {
	await sleep(10000);

	try {
		await client.createIndex({ uid: index.uid, primaryKey: 'id' })
	    await client.getIndex(index.uid).addDocuments(dataset)
	} catch(e) {
		console.log('Error:', e.stack);
	}

    
})()



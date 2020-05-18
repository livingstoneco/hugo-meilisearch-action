const core = require('@actions/core');
const MeiliSearch = require('meilisearch');
var fs = require('fs');

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const config = {
    host: core.getInput('host'),
    apiKey: core.getInput('key'),
}

const index = {
	uid: core.getInput('indexName'),
}

// Create MeiliSearch client
var client = new MeiliSearch(config)

const indexes = client.listIndexes()

// Delete index if already exists
indexes.then(function(data) {
	data.forEach(function(item) {
		if(item.uid === index.uid) {
			let posts = client.getIndex(item.uid)
			posts.deleteIndex()
			
		}
	})
});



const dataset = JSON.parse(fs.readFileSync('./docs/searchindex.json', 'utf8'));

;(async () => {
	await sleep(2000);

	try {
		await client.createIndex({ uid: index.uid, primaryKey: 'id' })
	    await client.getIndex(index.uid).addDocuments(dataset)
	} catch(e) {
		console.log('Error:', e.stack);
	}

    
})()



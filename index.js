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
		if(item.uid == index.uid) {
			let posts = client.getIndex(index.uid)
			posts.deleteIndex()
			console.log(`Deleted Index: ${item.uid}`)
		}
	})
});

const dataset = JSON.parse(fs.readFileSync('./docs/searchindex.json', 'utf8'));

console.log(dataset);

;(async () => {
	

	try {
		await client.createIndex({ uid: index.uid, primaryKey: 'id' })
	    await client.getIndex(index.uid).addDocuments(dataset)
	} catch(e) {
		console.log('Error:', e.stack);
	}

    
})()



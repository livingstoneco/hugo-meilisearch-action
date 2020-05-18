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

const all = (async () => {
 return await client.listIndexes()
})()

const dataset = JSON.parse(fs.readFileSync('./docs/searchindex.json', 'utf8'));

console.log(all);

// ;(async () => {
	
	
// 	all.forEach(function(item) {
// 		if(item.uid == index.uid) {
// 			let posts = client.getIndex(index.uid)
// 			posts.deleteIndex()
// 		}
// 	})

// 	try {
// 		await client.createIndex(index.uid)
// 	    await client.getIndex(index.uid).addDocuments(dataset)
// 	} catch(e) {
// 		console.log('Error:', e.stack);
// 	}

    
// })()



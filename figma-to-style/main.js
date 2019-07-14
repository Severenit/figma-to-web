require('dotenv').config()
const fetch = require('node-fetch');
const fs = require('fs');
const StyleDictionary = require('style-dictionary').extend('./config.json');

const getStylesArtboard = require('./lib/get-styles-artboard.js');

const headers = new fetch.Headers();
const devToken = process.env.DEV_TOKEN;

const fileKey = process.argv[2];

headers.append('X-Figma-Token', devToken);

let query = {
	url: {
		host: 'api.figma.com',
		protocol: 'https',
	}
}

async function main() {
	const result = await getStylesArtboard(fileKey, query.url);

	const pathWriteFile = `./json/token.json`;

	fs.writeFile(pathWriteFile, JSON.stringify(result), (err) => {
		if (err) console.log(err);
		console.log(`wrote ${pathWriteFile}`);
		StyleDictionary.buildAllPlatforms();
	});
}

main().catch((err) => {
	console.error(err);
	console.error(err.stack);
});
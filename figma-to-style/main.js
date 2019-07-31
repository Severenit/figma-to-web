require('dotenv').config()
const fetch = require('node-fetch');
const fs = require('fs');
const shell = require('shelljs');
const StyleDictionary = require('style-dictionary').extend('./config.json');

const getStylesArtboard = require('./lib/get-styles-artboard.js');
const getSpacers = require('./lib/get-spacers.js');

const headers = new fetch.Headers();
const devToken = process.env.DEV_TOKEN;

const fileKey = process.argv[2];
const type = process.argv[4];
const spacerArg = process.argv[4];
let spacersId;
if (spacerArg && spacerArg.indexOf('spacers') !== -1) {
	spacersId = spacerArg.slice(spacerArg.indexOf('=')+1, spacerArg.length);
}

headers.append('X-Figma-Token', devToken);

let query = {
	url: {
		host: 'api.figma.com',
		protocol: 'https',
	}
}

async function main() {
	console.log('> We start, please wait...');
	const style = await getStylesArtboard(fileKey, query.url);
	let result = style;

	if (spacersId && type === 'files') {
		const spacers = await getSpacers(spacersId, fileKey, query.url);
		result = {
			...style,
			size: {
				...style.size,
				spacers
			}
		}
	}

	shell.exec('rm -rf ./json/token.json');
	const pathWriteFile = `./json/token.json`;

	fs.writeFile(pathWriteFile, JSON.stringify(result), (err) => {
		if (err) console.log(err);
		StyleDictionary.cleanAllPlatforms();
		console.log(`> Ok, we finish! And wrote file ${pathWriteFile}`);
		console.log('> Now, we will compile the styles for you! -->');
		shell.exec('style-dictionary build');
	});
}

main().catch((err) => {
	console.error(err);
	console.error(err.stack);
});

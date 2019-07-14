const URL = require('url');
const fetch = require('node-fetch');
const headers = new fetch.Headers();
const devToken = process.env.DEV_TOKEN;
headers.append('X-Figma-Token', devToken);

const type = process.argv[3] || 'files';

const getFiles = require('./get-files.js');
const getTeamsStyle = require('./get-teams-style.js')
const getFontStyles = require('./get-font-styles.js');
const getColorPlatte = require('./get-color-platte.js');

module.exports = async function (key, URLformat) {
	let figmaTreeStructure;
	let figmaId;

	if (type === 'files') {
		figmaId = key;
		figmaTreeStructure = await getFiles(key, URLformat)
	}

	if (type === 'teams') {
		figmaTreeStructure = await getTeamsStyle(key, URLformat)
	}

	const { styles } = figmaTreeStructure;

	const stylesArr = Array.isArray(styles) ? styles : Object.keys(styles);

	const baseTokeensJSON = {
		grids: {},
		spacers: {},
		color: {},
		font: {}
	};

	for (const item of stylesArr) {
		let node_id = item;
		const styleType = type === 'files' ? styles[item].styleType : item.style_type;
		if (type === 'teams') {
			node_id = item.node_id;
			figmaId = item.file_key;
		}

		if (styleType === 'TEXT') {
			const fonts = await getFontStyles({
				node_id: node_id,
				file_key: figmaId
			}, URLformat);
			Object.assign(baseTokeensJSON.font, fonts);
		}

		if (styleType === 'FILL') {
			const color = await getColorPlatte({
				node_id: node_id,
				file_key: figmaId
			}, URLformat);
			Object.assign(baseTokeensJSON.color, color);
		}
	}

	return baseTokeensJSON;
}

const URL = require('url');
const fetch = require('node-fetch');
const headers = new fetch.Headers();
const devToken = process.env.DEV_TOKEN;
headers.append('X-Figma-Token', devToken);

let type = process.argv[3] || 'files';

const getFiles = require('./get-files.js');
const getTeamsStyle = require('./get-teams-style.js')
const getFontStyles = require('./get-font-styles.js');
const getColorPlatte = require('./get-color-platte.js');
const getGrids = require('./get-grids.js');
const getEffect = require('./get-effect.js');

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
		color: {},
		size: {
			font: {},
			grids: {}
		},
		font: {
			family: {},
			weight: {},
			spacing: {},
			lineheight: {}
		},
		grids: {},
		effects: {}
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

			Object.assign(baseTokeensJSON.size.font, fonts.size.font);
			Object.assign(baseTokeensJSON.font.family, fonts.font.family);
			Object.assign(baseTokeensJSON.font.weight, fonts.font.weight);
			Object.assign(baseTokeensJSON.font.spacing, fonts.font.spacing);
			Object.assign(baseTokeensJSON.font.lineheight, fonts.font.lineheight);
		}

		if (styleType === 'FILL') {
			const color = await getColorPlatte({
				node_id: node_id,
				file_key: figmaId
			}, URLformat);
			Object.assign(baseTokeensJSON.color, color);
		}

		if (styleType === 'GRID') {
			const grids = await getGrids({
				node_id: node_id,
				file_key: figmaId
			}, URLformat);
			Object.assign(baseTokeensJSON.size.grids, grids.size.grids);
			Object.assign(baseTokeensJSON.grids, grids.grids);
		}

		if (styleType === 'EFFECT') {
			const effect = await getEffect({
				node_id: node_id,
				file_key: figmaId
			}, URLformat);

			Object.assign(baseTokeensJSON.effects, effect);
		}
	}

	return baseTokeensJSON;
}

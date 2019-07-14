const naming = require('./naming.js');
const getNodeId = require('./get-node-id');

function rgba(background) {
	return `rgba(${Math.floor(background.r * 255)}, ${Math.floor(background.g * 255)}, ${Math.floor(background.b * 255)}, ${background.a})`
}

module.exports = async function(item, URLformat) {
	const { node_id, file_key } = item;
	const figmaTreeStructure = await getNodeId(node_id, file_key, URLformat);
	const {
		document
	} = figmaTreeStructure;

	console.log(naming(document.name) ,' - ', document.type);
	return {
		[naming(document.name)]: {
			value: rgba(document.fills[0].color),
			type: "color"
		}
	};
}
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
	return {
		[naming(document.name)]: {
			value: `${document.effects[0].offset.x}px ${document.effects[0].offset.y}px ${document.effects[0].radius}px ${rgba(document.effects[0].color)}`,
			type: "effects"
		}
	};
}
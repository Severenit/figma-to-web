const naming = require('./naming.js');
const getNodeId = require('./get-node-id');

module.exports = async function (item, URLformat) {
	const { node_id, file_key } = item;
	const figmaTreeStructure = await getNodeId(node_id, file_key, URLformat);
	const {
		document
	} = figmaTreeStructure;

	console.log(naming(document.name) ,' - ', document.type);

	return {
		[naming(document.name)]: {
			family: {
				value: `${document.style.fontFamily}, ${
					document.style.fontPostScriptName
					}`,
				type: "typography"
			},
			size: {
				value: document.style.fontSize,
				type: "typography"
			},
			weight: {
				value: document.style.fontWeight,
				type: "typography"
			},
			lineheight: {
				value: `${document.style.lineHeightPercent}%`,
				type: "typography"
			},
			spacing: {
				value:
					document.style.letterSpacing !== 0
						? `${document.style.letterSpacing}px`
						: "normal",
				type: "typography"
			}
		}
	};
}
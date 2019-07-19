const naming = require('./naming.js');
const getNodeId = require('./get-node-id');

module.exports = async function (item, URLformat) {
	const { node_id, file_key } = item;
	const figmaTreeStructure = await getNodeId(node_id, file_key, URLformat);
	const {
		document
	} = figmaTreeStructure;
	return {
		size: {
			font: {
				[naming(document.name)]: {
					value: document.style.fontSize,
					type: "typography"
				}
			}
		},
		font: {
			family: {
				[naming(document.name)]: {
					value: `${document.style.fontFamily}, ${
						document.style.fontPostScriptName
						}`,
					type: "typography"
				}
			},
			weight: {
				[naming(document.name)]: {
					value: document.style.fontWeight,
					type: "typography"
				}
			},
			lineheight: {
				[naming(document.name)]: {
					value: `${document.style.lineHeightPercent}%`,
					type: "typography"
				}
			},
			spacing: {
				[naming(document.name)]: {
					value:
						document.style.letterSpacing !== 0
							? `${document.style.letterSpacing}px`
							: "normal",
					type: "typography"
				}
			}
		}
	};
}
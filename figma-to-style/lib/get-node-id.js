const URL = require('url');
const fetch = require('node-fetch');
const headers = new fetch.Headers();
const devToken = process.env.DEV_TOKEN;
headers.append('X-Figma-Token', devToken);

module.exports = async function (node_id, file_key, URLformat) {
	URLformat = {
		...URLformat,
		pathname: `/v1/files/${file_key}/nodes`,
		query: {
			...URLformat.query,
			ids: node_id
		}
	}

	const result = await fetch(`${URL.format(URLformat).toString()}`, { headers });
	const figmaTreeStructure = await result.json();

	return figmaTreeStructure.nodes[node_id];
}
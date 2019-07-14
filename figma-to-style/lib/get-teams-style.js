const URL = require('url');
const fetch = require('node-fetch');
const headers = new fetch.Headers();
const devToken = process.env.DEV_TOKEN;
headers.append('X-Figma-Token', devToken);

module.exports = async function (file_key, URLformat) {
	URLformat = {
		...URLformat,
		pathname: `/v1/teams/${file_key}/styles`,
		query: {
			page_size: 10000000
		}
	}
	const result = await fetch(`${URL.format(URLformat).toString()}`, { headers });
	const figmaTreeStructure = await result.json();

	return figmaTreeStructure.meta;
}
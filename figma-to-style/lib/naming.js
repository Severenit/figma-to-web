const SEPARATOR_NAME = '-';

module.exports = function (name) {
	return name
		.toLowerCase()
		.replace(/ /ig, `${SEPARATOR_NAME}`)
		.replace(/\//ig, `${SEPARATOR_NAME}`)
		.replace(/-/ig, `${SEPARATOR_NAME}`);
}
function flatten(arr, val) {
	return arr.reduce((acc, val) => acc.concat(val), [])
}

function pluck (arr, key) {
	return arr.map(function(item) { return item[key]; });
}

export { flatten, pluck }

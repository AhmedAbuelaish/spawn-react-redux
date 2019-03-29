function flatten(arr, val) {
	return arr.reduce((acc, val) => acc.concat(val), [])
}

function pluck(arr, key) {
	return arr.map(function(item) {
		return item[key]
	})
}

function multiPluck(arr, keys) {
	return arr.map(function(item) {
		var obj = {}
		for (var i = 0; i < keys.length; i++) {
			obj[keys[i]] = item[keys[i]]
		}
		return obj
	})
}

export { flatten, pluck, multiPluck }

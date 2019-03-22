export default function flatten(arr, val) {
	return arr.reduce((acc, val) => acc.concat(val), [])
}

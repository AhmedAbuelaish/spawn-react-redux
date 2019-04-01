import { distributeParentValue } from './fragment'
import doLeavesIntersectObstacles from './collisions'
import { flatten } from './arrayFunctions'

export default () => {
	importScripts('fragment.js','collisions.js','arrayFunctions.js','angleFunctions.js','randomSpread.js')
  onmessage = (e) => {
    // eslint-disable-line no-restricted-globals
		if (!e) return


    console.log('received message from container')
    console.log(e.data)
		let leaves = e.data[0]
		let settings = e.data[1]
    let obstacles = e.data[2]
    let processedLeaves = leaves
		while (processedLeaves.length !== []) {
      // console.log(JSON.stringify(processedLeaves.slice()))
			console.log(processedLeaves.slice().length)
			let leafIndex = Math.floor(Math.random() * processedLeaves.length)
			let tempNodesArr = distributeParentValue(processedLeaves[leafIndex], settings)
			tempNodesArr = doLeavesIntersectObstacles(tempNodesArr, obstacles)
			processedLeaves[leafIndex] = tempNodesArr
			processedLeaves = flatten(processedLeaves)
			postMessage([tempNodesArr, processedLeaves])
		}
		postMessage('pong')
  }
}

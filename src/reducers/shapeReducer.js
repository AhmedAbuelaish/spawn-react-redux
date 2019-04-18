import createFragmentedArray from '../utils/fragment'
import calcNewZoom from '../utils/stageSetup'
import doLeavesIntersectObstacles from '../utils/collisions'
import { levelStates } from '../levels/levels'
// import highlightWinningPath from '../utils/winningPath'

const defaultLevel = 1

const initialState = {
	viewportDims: { width: window.innerWidth, height: window.innerHeight },
	nodes: [],
	leaves: [],
	gameMode: 'breakOut',
	level: defaultLevel,
	stage: levelStates[defaultLevel].stage,
	settings: levelStates[defaultLevel].settings,
	obstacles: levelStates[defaultLevel].obstacles,
	targets: levelStates[defaultLevel].targets
}

const shapeReducer = (state = initialState, action) => {
	var newNodes = state.nodes.slice()
	var newLeaves = state.leaves.slice()
	var newSettings = { ...state.settings }
	var newViewportDims = { ...state.viewportDims }
	var newStage = state.stage
	var newGameMode = state.gameMode
	var newLevel
	var rootZero = {
		id: 0,
		radius: state.settings.rootSize,
		coordX: state.settings.rootCoords.coordX,
		coordY: state.settings.rootCoords.coordY,
		angle: state.settings.rootAngle,
		color: `210, ${150 * 20}, ${150 * 40}` // rgb values
	}
	switch (action.type) {
		case 'RESET_ROOT':
			return { ...state, nodes: [rootZero], leaves: [rootZero], stage: levelStates[state.level].stage }
		case 'NEW_ROOT':
			var newRootIndex = state.nodes.findIndex(function(node) {
				return node.id === action.id
			})
			var newRoot = state.nodes[newRootIndex]
			var burstId = newRoot.id.toString().split('x')[0]
			newRoot.id.toString().split('x')[1]
				? (newRoot.id = burstId + '1x' + newRoot.id.toString().split('x')[1])
				: (newRoot.id = '1x' + newRoot.id)
			console.log(action.burst)
			newRoot.radius = newRoot.radius + action.burst
			return { ...state, leaves: [newRoot] }
		case 'CREATE_NODES':
			newLeaves = createFragmentedArray(newLeaves, newSettings)
			newStage = calcNewZoom(newLeaves, state.stage, state.viewportDims)
			newLeaves = doLeavesIntersectObstacles(newLeaves, state.obstacles, 'lose')
			newLeaves = doLeavesIntersectObstacles(newLeaves, state.targets, 'win')
			Array.prototype.push.apply(newNodes, newLeaves)
			return { ...state, nodes: newNodes, leaves: newLeaves, stage: newStage }
		// case 'GET_WINNING_PATH':
		// 	newNodes = highlightWinningPath(newNodes)
		// 	return {...state,nodes:newNodes}
		case 'UPDATE_SETTINGS':
			return { ...state, settings: action.settings }
		case 'UPDATE_VIEWPORT':
			newViewportDims = action.viewportDims
			return { ...state, viewportDims: newViewportDims }
		case 'TOGGLE_GAME_MODE':
			if (newGameMode == 'breakOut') {
				newGameMode = 'sandbox'
				newLevel = levelStates[0]
			} else {
				newGameMode = 'breakOut'
				newLevel = levelStates[state.level]
			}
			return {
				...state,
				gameMode: newGameMode,
				stage: newLevel.stage,
				settings: newLevel.settings,
				obstacles: newLevel.obstacles,
				targets: newLevel.targets
			}
		default:
			return state
	}
}

export default shapeReducer

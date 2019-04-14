import createFragmentedArray from '../utils/fragment'
import calcNewZoom from '../utils/stageSetup'
import doLeavesIntersectObstacles from '../utils/collisions'
import { levelStates } from '../levels/levels'
// import highlightWinningPath from '../utils/winningPath'

const initialState = {
	viewportDims: { width: window.innerWidth, height: window.innerHeight },
	stage: { x: { min: 0, max: window.innerWidth }, y: { min: 0, max: window.innerHeight }, zoom: 1 },
	settings: levelStates[2].settings,
	nodes: [],
	leaves: [],
	obstacles: levelStates[2].obstacles,
	targets: levelStates[2].targets,
	gameMode: 'breakOut'
}

initialState.stage = levelStates[2].stage

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
		case 'RESET':
			return { ...state, nodes: [], leaves: [], stage: levelStates[2].stage }
		case 'CREATE_ROOT':
			newNodes = [rootZero]
			newLeaves = newNodes
			return { ...state, nodes: newNodes, leaves: newLeaves }
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
			newSettings = action.settings
			return { ...state, settings: newSettings }
		case 'UPDATE_VIEWPORT':
			newViewportDims = action.viewportDims
			return { ...state, viewportDims: newViewportDims }
		case 'TOGGLE_GAME_MODE':
			if (newGameMode == 'breakOut') {
				newGameMode = 'sandbox'
				newLevel = levelStates[0]
			} else {
				newGameMode = 'breakOut'
				newLevel = levelStates[2]
			}
			newNodes = [rootZero]
			newLeaves = newNodes
			return {
				...state,
				gameMode: newGameMode,
				stage: newLevel.stage,
				settings: newLevel.settings,
				obstacles: newLevel.obstacles,
				targets: newLevel.targets,
				nodes: newNodes,
				leaves: newLeaves
			}
		default:
			return state
	}
}

export default shapeReducer

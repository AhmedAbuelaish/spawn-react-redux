import { createFragmentedArray, distributeParentValue } from '../utils/fragment'
import calcNewZoom from '../utils/stageSetup'
import doLeavesIntersectObstacles from '../utils/collisions'
import { levelStates } from '../levels/levels'
// import highlightWinningPath from '../utils/winningPath'

// This reducer references/holds the main store
// It modifies the main state of the app

const initialState = {
	viewportDims: { width: window.innerWidth, height: window.innerHeight },
	stage: levelStates[1].stage,
	settings: levelStates[1].settings,
	nodes: [],
	tempNodes: [],
	leaves: [],
	obstacles: levelStates[1].obstacles, // Draw obstacles clockwise
	targets: levelStates[1].targets,
	gameMode: 'breakOut'
}

const shapeReducer = (state = initialState, action) => {
	var newNodes = state.nodes.slice()
	var newLeaves = state.leaves.slice()
	var newSettings = { ...state.settings }
	var newViewportDims = { ...state.viewportDims }
	var newStage = state.stage
	var newGameMode = state.gameMode
	var newLevel
	switch (action.type) {
		case 'RESET':
			return { ...state, nodes: [], leaves: [], stage: levelStates[1].stage }
		case 'CREATE_ROOT':
			newNodes = [
				{
					id: 0,
					radius: state.settings.rootSize,
					coordX: state.settings.rootCoords.coordX,
					coordY: state.settings.rootCoords.coordY,
					angle: state.settings.rootAngle,
					color: `210, ${150 * 20}, ${150 * 40}` // rgb values
				}
			]
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
		case 'CREATE_LEAVES':
			Array.prototype.push.apply(newNodes, action.tempNodesArr)
			newStage = calcNewZoom(action.tempNodesArr, state.stage, state.viewportDims)
			return { ...state, nodes: newNodes, leaves: action.leavesArr, stage: newStage }
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
				newLevel = levelStates[1]
			}
			newNodes = [
				{
					id: 0,
					radius: newLevel.settings.rootSize,
					coordX: newLevel.settings.rootCoords.coordX,
					coordY: newLevel.settings.rootCoords.coordY,
					angle: newLevel.settings.rootAngle,
					color: `210, ${150 * 20}, ${150 * 40}` // rgb values
				}
			]
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

// type: 'CREATE_LEAVES', singleTempNode: tempNodeArr, newLeaves: newLeavesArr })

const wWidth = window.innerWidth
const wHeight = window.innerHeight

const levelStates = {
	0: {

	},
	1: {
		settings: {
			angleRange: [[-45, 45]], // Range: -180 to 180
			maxAngleRanges: 4,
			minSize: 4,
			multiplier: 130,
			multiplierPrecision: 80, // Higher Levels, precision -> 100%
			decay: 90,
			decayPrecision: 40, // Higher Levels, precision -> 100%
			rootAngle: 0,
			rootCoords: { coordX: wWidth * 0.5, coordY: wHeight * 0.5 },
			rootSize: 100
		},
		obstacles: [
			[{ x: 0, y: 0 }, { x: wWidth * 0.4, y: 0 }, { x: wWidth * 0.4, y: 50 }, { x: 0, y: 50 }],
			[
				{ x: 0, y: window.innerHeight - 50 },
				{ x: wWidth * 0.4, y: window.innerHeight - 50 },
				{ x: wWidth * 0.4, y: window.innerHeight },
				{ x: 0, y: window.innerHeight }
			],
			[{ x: 0, y: 0 }, { x: 50, y: 0 }, { x: 50, y: window.innerHeight }, { x: 0, y: window.innerHeight }]
		], // Draw obstacles clockwise
		targets: [
			[
				{ x: wWidth - 350, y: 300 },
				{ x: wWidth - 300, y: 300 },
				{ x: wWidth - 300, y: 600 },
				{ x: wWidth - 350, y: 600 }
			]
		]
	},
	2: {
		settings: {
			angleRange: [[-45, 45]], // Range: -180 to 180
			maxAngleRanges: 4,
			minSize: 4,
			multiplier: 130,
			multiplierPrecision: 80, // Higher Levels, precision -> 100%
			decay: 90,
			decayPrecision: 40, // Higher Levels, precision -> 100%
			rootAngle: 0,
			rootCoords: { coordX: wWidth * 0.5, coordY: wHeight * 0.5 },
			rootSize: 100
		},
		obstacles: [
			[{ x: 0, y: 0 }, { x: wWidth, y: 0 }, { x: wWidth, y: 50 }, { x: 0, y: 50 }],
			[
				{ x: wWidth - 350, y: 300 },
				{ x: wWidth - 300, y: 300 },
				{ x: wWidth - 300, y: 600 },
				{ x: wWidth - 350, y: 600 }
			],
			[
				{ x: 0, y: wHeight - 300 },
				{ x: wWidth, y: wHeight - 300 },
				{ x: wWidth, y: wHeight - 250 },
				{ x: 0, y: wHeight - 250 }
			],
			[{ x: 0, y: 0 }, { x: 50, y: 0 }, { x: 50, y: wHeight }, { x: 0, y: wHeight }]
		], // Draw obstacles clockwise
		targets: [
			[
				{ x: wWidth - 350, y: 300 },
				{ x: wWidth - 300, y: 300 },
				{ x: wWidth - 300, y: 600 },
				{ x: wWidth - 350, y: 600 }
			]
		]
	},
	3: {
		settings: {
			angleRange: [[-100, -70], [-45, 45], [70, 100]], // Range: -180 to 180
			maxAngleRanges: 4,
			minSize: 4,
			multiplier: 130,
			multiplierPrecision: 80, // Higher Levels, precision -> 100%
			decay: 90,
			decayPrecision: 40, // Higher Levels, precision -> 100%
			rootAngle: 0,
			rootCoords: { coordX: wWidth * 0.5, coordY: wHeight * 0.5 },
			rootSize: 100
		},
		obstacles: [
			[{ x: 0, y: 0 }, { x: wWidth, y: 0 }, { x: wWidth, y: 50 }, { x: 0, y: 50 }],
			[
				{ x: wWidth - 350, y: 300 },
				{ x: wWidth - 300, y: 300 },
				{ x: wWidth - 300, y: 600 },
				{ x: wWidth - 350, y: 600 }
			],
			[
				{ x: 0, y: wHeight - 300 },
				{ x: wWidth, y: wHeight - 300 },
				{ x: wWidth, y: wHeight - 250 },
				{ x: 0, y: wHeight - 250 }
			],
			[{ x: 0, y: 0 }, { x: 50, y: 0 }, { x: 50, y: wHeight }, { x: 0, y: wHeight }]
		], // Draw obstacles clockwise
		targets: [
			[
				{ x: wWidth - 350, y: 300 },
				{ x: wWidth - 300, y: 300 },
				{ x: wWidth - 300, y: 600 },
				{ x: wWidth - 350, y: 600 }
			]
		]
	}
}

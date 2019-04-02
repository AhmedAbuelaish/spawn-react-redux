export const levelStates = {
	0: {
		settings: {
			angleRange: [[-100, -70], [-45, 45], [70, 100]], // Range: -180 to 180
			maxAngleRanges: 4,
			minSize: 4,
			multiplier: 130,
			multiplierPrecision: 80, // Higher Levels, precision -> 100%
			decay: 90,
			decayPrecision: 40, // Higher Levels, precision -> 100%
			rootAngle: 0,
			rootCoords: { coordX: window.innerWidth * 0.5, coordY: window.innerHeight * 0.5 },
			rootSize: 100
		},
		obstacles: [],
		targets: []
	},
	1: {
		settings: {
			angleRange: [[-100, -70], [-45, 45], [70, 100]], // Range: -180 to 180
			maxAngleRanges: 4,
			minSize: 4,
			multiplier: 130,
			multiplierPrecision: 80, // Higher Levels, precision -> 100%
			decay: 90,
			decayPrecision: 40, // Higher Levels, precision -> 100%
			rootAngle: 0,
			rootCoords: { coordX: window.innerWidth * 0.2, coordY: window.innerHeight * 0.5 },
			rootSize: 100
		},
		obstacles: [
			[{ x: 0, y: 0 }, { x: window.innerWidth * 0.4, y: 0 }, { x: window.innerWidth * 0.4, y: 50 }, { x: 0, y: 50 }],
			[
				{ x: 0, y: window.innerHeight - 50 },
				{ x: window.innerWidth * 0.4, y: window.innerHeight - 50 },
				{ x: window.innerWidth * 0.4, y: window.innerHeight },
				{ x: 0, y: window.innerHeight }
			],
			[{ x: 0, y: 0 }, { x: 50, y: 0 }, { x: 50, y: window.innerHeight }, { x: 0, y: window.innerHeight }]
		], // Draw obstacles clockwise
		targets: [
			[
				{ x: window.innerWidth - 350, y: 300 },
				{ x: window.innerWidth - 300, y: 300 },
				{ x: window.innerWidth - 300, y: 600 },
				{ x: window.innerWidth - 350, y: 600 }
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
			rootCoords: { coordX: window.innerWidth * 0.5, coordY: window.innerHeight * 0.5 },
			rootSize: 100
		},
		obstacles: [
			[{ x: 0, y: 0 }, { x: window.innerWidth, y: 0 }, { x: window.innerWidth, y: 50 }, { x: 0, y: 50 }],
			[
				{ x: window.innerWidth - 350, y: 300 },
				{ x: window.innerWidth - 300, y: 300 },
				{ x: window.innerWidth - 300, y: 600 },
				{ x: window.innerWidth - 350, y: 600 }
			],
			[
				{ x: 0, y: window.innerHeight - 300 },
				{ x: window.innerWidth, y: window.innerHeight - 300 },
				{ x: window.innerWidth, y: window.innerHeight - 250 },
				{ x: 0, y: window.innerHeight - 250 }
			],
			[{ x: 0, y: 0 }, { x: 50, y: 0 }, { x: 50, y: window.innerHeight }, { x: 0, y: window.innerHeight }]
		], // Draw obstacles clockwise
		targets: [
			[
				{ x: window.innerWidth - 350, y: 300 },
				{ x: window.innerWidth - 300, y: 300 },
				{ x: window.innerWidth - 300, y: 600 },
				{ x: window.innerWidth - 350, y: 600 }
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
			rootCoords: { coordX: window.innerWidth * 0.5, coordY: window.innerHeight * 0.5 },
			rootSize: 100
		},
		obstacles: [
			[{ x: 0, y: 0 }, { x: window.innerWidth, y: 0 }, { x: window.innerWidth, y: 50 }, { x: 0, y: 50 }],
			[
				{ x: window.innerWidth - 350, y: 300 },
				{ x: window.innerWidth - 300, y: 300 },
				{ x: window.innerWidth - 300, y: 600 },
				{ x: window.innerWidth - 350, y: 600 }
			],
			[
				{ x: 0, y: window.innerHeight - 300 },
				{ x: window.innerWidth, y: window.innerHeight - 300 },
				{ x: window.innerWidth, y: window.innerHeight - 250 },
				{ x: 0, y: window.innerHeight - 250 }
			],
			[{ x: 0, y: 0 }, { x: 50, y: 0 }, { x: 50, y: window.innerHeight }, { x: 0, y: window.innerHeight }]
		], // Draw obstacles clockwise
		targets: [
			[
				{ x: window.innerWidth - 350, y: 300 },
				{ x: window.innerWidth - 300, y: 300 },
				{ x: window.innerWidth - 300, y: 600 },
				{ x: window.innerWidth - 350, y: 600 }
			]
		]
	}
}

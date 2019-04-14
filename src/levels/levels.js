export const levelStates = {
	0: {
		stage: { x: { min: 0, max: window.innerWidth }, y: { min: 0, max: window.innerHeight }, zoom: 0.3 },
		settings: {
			angleRange: [[-100, -70], [-45, 45], [70, 100]], // Range: -180 to 180
			maxAngleRanges: 4,
			minSize: 4,
			multiplier: 130,
			multiplierPrecision: 80, // Higher Levels, precision -> 100%
			decay: 10,
			decayPrecision: 40, // Higher Levels, precision -> 100%
			anglePrecision: 50,
			rootAngle: -90,
			rootCoords: { coordX: window.innerWidth * 0.5, coordY: window.innerHeight * 0.5 },
			rootSize: 100
		},
		obstacles: [],
		targets: []
	},
	1: {
		stage: { x: { min: 0, max: window.innerWidth }, y: { min: 0, max: window.innerHeight }, zoom: 0.3 },
		settings: {
			angleRange: [[-100, -70], [-45, 45], [70, 100]], // Range: -180 to 180
			maxAngleRanges: 4,
			minSize: 4,
			multiplier: 200,
			multiplierPrecision: 80, // Higher Levels, precision -> 100%
			decay: 10,
			decayPrecision: 50, // Higher Levels, precision -> 100%
			anglePrecision: 100,
			rootAngle: 0,
			rootCoords: { coordX: window.innerWidth * 0.4, coordY: window.innerHeight * 0.5 },
			rootSize: 100
		},
		obstacles: [
			[
				{ x: window.innerWidth * 0.2, y: window.innerHeight * 0.1 },
				{ x: window.innerWidth * 0.8, y: window.innerHeight * 0.1 },
				{ x: window.innerWidth * 0.8, y: window.innerHeight * 0.1 + 50 },
				{ x: window.innerWidth * 0.2, y: window.innerHeight * 0.1 + 50 }
			],
			[
				{ x: window.innerWidth * 0.2, y: window.innerHeight * 0.9 - 50 },
				{ x: window.innerWidth * 0.8, y: window.innerHeight * 0.9 - 50 },
				{ x: window.innerWidth * 0.8, y: window.innerHeight * 0.9 },
				{ x: window.innerWidth * 0.2, y: window.innerHeight * 0.9 }
			],
			[
				{ x: window.innerWidth * 0.2, y: window.innerHeight * 0.1 + 50 },
				{ x: window.innerWidth * 0.2 + 50, y: window.innerHeight * 0.1 + 50 },
				{ x: window.innerWidth * 0.2 + 50, y: window.innerHeight * 0.9 - 50 },
				{ x: window.innerWidth * 0.2, y: window.innerHeight * 0.9 - 50 }
			]
		], // Draw obstacles clockwise
		targets: [
			[
				{ x: window.innerWidth * 0.8 - 50, y: window.innerHeight * 0.1 + 50 },
				{ x: window.innerWidth * 0.8, y: window.innerHeight * 0.1 + 50 },
				{ x: window.innerWidth * 0.8, y: window.innerHeight * 0.9 - 50 },
				{ x: window.innerWidth * 0.8 - 50, y: window.innerHeight * 0.9 - 50 }
			]
		]
	},
	2: {
		stage: { x: { min: 0, max: window.innerWidth }, y: { min: 0, max: window.innerHeight }, zoom: 0.3 },
		settings: {
			angleRange: [[-45, 45]], // Range: -180 to 180
			maxAngleRanges: 4,
			minSize: 4,
			multiplier: 200,
			multiplierPrecision: 80, // Higher Levels, precision -> 100%
			decay: 10,
			decayPrecision: 50, // Higher Levels, precision -> 100%
			anglePrecision: 100,
			rootAngle: 0,
			rootCoords: { coordX: window.innerWidth * 0.4, coordY: window.innerHeight * 0.5 },
			rootSize: 100
		},
		obstacles: [
			[
				{ x: window.innerWidth * 0.2, y: window.innerHeight * 0.1 },
				{ x: window.innerWidth * 0.8, y: window.innerHeight * 0.1 },
				{ x: window.innerWidth * 0.8, y: window.innerHeight * 0.1 + 50 },
				{ x: window.innerWidth * 0.2, y: window.innerHeight * 0.1 + 50 }
			],
			[
				{ x: window.innerWidth * 0.2, y: window.innerHeight * 0.9 - 50 },
				{ x: window.innerWidth * 0.8, y: window.innerHeight * 0.9 - 50 },
				{ x: window.innerWidth * 0.8, y: window.innerHeight * 0.9 },
				{ x: window.innerWidth * 0.2, y: window.innerHeight * 0.9 }
			],
			[
				{ x: window.innerWidth * 0.2, y: window.innerHeight * 0.1 + 50 },
				{ x: window.innerWidth * 0.2 + 50, y: window.innerHeight * 0.1 + 50 },
				{ x: window.innerWidth * 0.2 + 50, y: window.innerHeight * 0.9 - 50 },
				{ x: window.innerWidth * 0.2, y: window.innerHeight * 0.9 - 50 }
			],
			[
				{ x: window.innerWidth * 0.7 - 50, y: window.innerHeight * 0.3 + 50 },
				{ x: window.innerWidth * 0.7, y: window.innerHeight * 0.3 + 50 },
				{ x: window.innerWidth * 0.7, y: window.innerHeight * 0.7 - 50 },
				{ x: window.innerWidth * 0.7 - 50, y: window.innerHeight * 0.7 - 50 }
			]
		], // Draw obstacles clockwise
		targets: [
			[
				{ x: window.innerWidth * 0.7 - 50, y: window.innerHeight * 0.1 + 50 },
				{ x: window.innerWidth * 0.7, y: window.innerHeight * 0.1 + 50 },
				{ x: window.innerWidth * 0.7, y: window.innerHeight * 0.4 - 50 },
				{ x: window.innerWidth * 0.7 - 50, y: window.innerHeight * 0.4 - 50 }
			],
			[
				{ x: window.innerWidth * 0.7 - 50, y: window.innerHeight * 0.6 + 50 },
				{ x: window.innerWidth * 0.7, y: window.innerHeight * 0.6 + 50 },
				{ x: window.innerWidth * 0.7, y: window.innerHeight * 0.9 - 50 },
				{ x: window.innerWidth * 0.7 - 50, y: window.innerHeight * 0.9 - 50 }
			]
		]
	}
}

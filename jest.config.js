module.exports = {
	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	},
	testMatch: [
		'<rootDir>/JavaScript/**/*.spec.ts',
		'<rootDir>/JavaScript/**/*.spec.tsx'
	],
	moduleFileExtensions: [
		'ts',
		'tsx',
		'js',
		'jsx',
		'json',
		'node'
	]
};

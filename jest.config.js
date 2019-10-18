module.exports = {
	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	},
	testMatch: ['<rootDir>/JavaScript/**/*.spec.ts'],
	moduleFileExtensions: [
		'ts',
		'tsx',
		'js',
		'jsx',
		'json',
		'node'
	]
};

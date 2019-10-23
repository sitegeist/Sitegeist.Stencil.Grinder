require('isomorphic-fetch');

const { default: createStencilGrinderClient } = require('@sitegeist/stencil-grinder-client');
const stencilGrinderClient = createStencilGrinderClient({
	endpoint: `http://webserver:${process.env.PORT}/stencil.grinder`,
	defaultUriSuffix: '.html'
});

exports.createPages = async ({ actions: { createPage } }) => {
	const allPages = await stencilGrinderClient.fetchIndex('[!instanceof Neos.Neos:Shortcut]');


	await Promise.all(allPages.payload.map(async page => {
		const pageData = await stencilGrinderClient.fetchDocument(page.payload.url);

		if (pageData.type === 'Sitegeist.Stencil.Grinder/v1/DOCUMENT') {
			createPage({
				path: page.payload.url,
				component: require.resolve("./src/templates/index.js"),
				context: { root: pageData.payload }
			});
		}
	}))
}

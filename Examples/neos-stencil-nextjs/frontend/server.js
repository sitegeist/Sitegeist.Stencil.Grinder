require('es6-promise').polyfill();
require('isomorphic-fetch');

const express = require('express');
const next = require('next');
const {default: createStencilGrinderClient} = require('@sitegeist/stencil-grinder-client');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const stencilGrinderClient = createStencilGrinderClient({
	endpoint: `http://webserver:${process.env.PORT}/stencil.grinder`,
	defaultUriSuffix: '.html'
});

app.prepare().then(() => {
	const server = express();

	server.all('*', async (req, res, next) => {
		if (req.path.startsWith('/_next')) {
			next();
			return;
		}

		try {
			const data = await stencilGrinderClient.fetchDocument(req.path);

			return app.render(req, res, '/', { data });
		} catch(error) {
			console.error(error);
			next();
		}
	});

	server.all('*', async (req, res) => {
		return handle(req, res);
	});

	server.listen(port, err => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${port}`);
	});
})

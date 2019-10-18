import "isomorphic-fetch";
import createStencilGrinderClient from "../src";

describe('example: neos-stencil-nextjs', () => {
	it('should be able to fetch the index', async () => {
		const client = createStencilGrinderClient({
			endpoint: `http://127.0.0.1:${process.env.PORT}/stencil.grinder`
		});

		expect(await client.fetchIndex()).toMatchSnapshot();
	});

	it('should be able to fetch a document', async () => {
		const client = createStencilGrinderClient({
			endpoint: `http://127.0.0.1:${process.env.PORT}/stencil.grinder`
		});

		expect(await client.fetchDocument('example-2')).toMatchSnapshot();
	});

	it('should be able to fetch a node', async () => {
		const client = createStencilGrinderClient({
			endpoint: `http://127.0.0.1:${process.env.PORT}/stencil.grinder`
		});

		expect(await client.fetchNode('e8f8003f-f247-41c9-a9bf-d2ba20de9976')).toMatchSnapshot();
	});
});

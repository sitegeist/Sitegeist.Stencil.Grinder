import React from "react";
import renderer from "react-test-renderer";
import register from "../src/register";
import Grinder from "../src/Grinder";

describe(`Grinder`, () => {
	beforeAll(() => {
		register('Site', props => (<div><Grinder data={props.children}/></div>));
		register('Header', () => (<header>HEADER</header>));
		register('Body', (props: { content: string }) => (<div>{props.content}</div>));
		register('Footer', () => (<footer>FOOTER</footer>));
	});

	it(`Should render a node`, () => {
		const rendered = renderer.create(
			<Grinder
				data={{
					type: 'Sitegeist.Stencil.Grinder/v1/NODE',
					payload: {
						component: 'Body',
						props: {
							content: 'Foo'
						}
					}
				}}
			/>
		);

		expect(rendered).toMatchSnapshot();
	});

	it(`Should render an array of nodes`, () => {
		const rendered = renderer.create(
			<Grinder
				data={[
					{
						type: 'Sitegeist.Stencil.Grinder/v1/NODE',
						payload: {
							component: 'Body',
							props: {
								content: 'Foo'
							}
						}
					},
					{
						type: 'Sitegeist.Stencil.Grinder/v1/NODE',
						payload: {
							component: 'Body',
							props: {
								content: 'Bar'
							}
						}
					}
				]}
			/>
		);

		expect(rendered).toMatchSnapshot();
	});

	it(`Should render a document`, () => {
		const rendered = renderer.create(
			<Grinder
				data={{
					type: 'Sitegeist.Stencil.Grinder/v1/DOCUMENT',
					payload: {
						type: 'Sitegeist.Stencil.Grinder/v1/NODE',
						payload: {
							component: 'Site',
							props: {
								children: [
									{
										type: 'Sitegeist.Stencil.Grinder/v1/NODE',
										payload: {
											component: 'Header'
										}
									},
									{
										type: 'Sitegeist.Stencil.Grinder/v1/NODE',
										payload: {
											component: 'Body',
											props: {
												content: 'Foo'
											}
										}
									},
									{
										type: 'Sitegeist.Stencil.Grinder/v1/NODE',
										payload: {
											component: 'Footer'
										}
									}
								]
							}
						}
					}
				}}
			/>
		);

		expect(rendered).toMatchSnapshot();
	});

	it(`should pass through strings`, () => {
		const rendered = renderer.create(
			<Grinder data={'Foo'} />
		);

		expect(rendered).toMatchSnapshot();
	});

	it(`should pass through arrays of strings`, () => {
		const rendered = renderer.create(
			<Grinder data={['Foo', 'Bar']} />
		);

		expect(rendered).toMatchSnapshot();
	});

	it(`should pass through numbers`, () => {
		const rendered = renderer.create(
			<Grinder data={12} />
		);

		expect(rendered).toMatchSnapshot();
	});

	it(`should pass through arrays of numbers`, () => {
		const rendered = renderer.create(
			<Grinder data={[12, 34]} />
		);

		expect(rendered).toMatchSnapshot();
	});

	it(`should pass through null`, () => {
		const rendered = renderer.create(
			<Grinder data={null} />
		);

		expect(rendered).toMatchSnapshot();
	});

	it(`should pass through arrays of null`, () => {
		const rendered = renderer.create(
			<Grinder data={[null, null, null]} />
		);

		expect(rendered).toMatchSnapshot();
	});

	it(`should throw, if attempted to render a command`, () => {
		expect(() => {
			renderer.create(
				<Grinder
					data={{
						type: 'Sitegeist.Stencil.Grinder/v1/COMMAND',
						payload: {
							directive: 'REDIRECT',
							options: {
								location: '/somewhere'
							}
						}
					}}
				/>
			);
		}).toThrowErrorMatchingSnapshot();
	});

	it(`should throw, if attempted to render an index`, () => {
		expect(() => {
			renderer.create(
				<Grinder
					data={{
						type: 'Sitegeist.Stencil.Grinder/v1/INDEX',
						payload: []
					}}
				/>
			);
		}).toThrowErrorMatchingSnapshot();
	});

	it(`should throw, if attempted to render anything else`, () => {
		expect(() => {
			renderer.create(
				<Grinder data={{foo: 'bar'}}/>
			);
		}).toThrowErrorMatchingSnapshot();

		expect(() => {
			renderer.create(
				<Grinder data={[{foo: 'bar'}]}/>
			);
		}).toThrowErrorMatchingSnapshot();
	});
})

import React from "react";
import renderer from "react-test-renderer";
import register, { get } from "../src/register";
import Grinder from "../src/Grinder";

describe(`Register functional component`, () => {
	it(`should be able to register a functional component`, () => {
		const MyFunctionalComponent = () => (
			<div>Test</div>
		);

		register('MyComponent', MyFunctionalComponent);

		expect(get('MyComponent')).not.toBe(null);
		expect(get('MyComponent')).toEqual(MyFunctionalComponent);
	});

	it(`should render a registered functional component correctly`, () => {
		const MyFunctionalComponent = () => (
			<div>Test</div>
		);

		register('MyComponent', MyFunctionalComponent);

		const rendered = renderer.create(
			<Grinder
				data={{
					type: 'Sitegeist.Stencil.Grinder/v1/NODE',
					payload: {
						component: 'MyComponent',
						props: {}
					}
				}}
			/>
		);

		expect(rendered.toJSON()).toMatchSnapshot();
	});
});

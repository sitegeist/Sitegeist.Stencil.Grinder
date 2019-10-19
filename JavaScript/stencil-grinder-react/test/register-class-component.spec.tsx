import React, { Component } from "react";
import renderer from "react-test-renderer";
import register, { get } from "../src/register";
import Grinder from "../src/Grinder";

describe(`Register class component`, () => {
	it(`should be able to register a class component`, () => {
		class MyClassComponent extends Component {
			render() {
				return (
					<div>Test</div>
				)
			}
		}

		register('MyComponent', MyClassComponent);

		expect(get('MyComponent')).not.toBe(null);
		expect(get('MyComponent')).toEqual(MyClassComponent);
	});

	it(`should render a registered class component correctly`, () => {
		class MyClassComponent extends Component {
			render() {
				return (
					<div>Test</div>
				)
			}
		}

		register('MyComponent', MyClassComponent);

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

import { ComponentType } from "react";

/**
 * This file is part of the Sitegeist.Stencil.Grinder package
 *
 * (c) 2019
 * Wilhelm Behncke <behncke@sitegeist.de>
 *
 * This package is Open Source Software. For the full copyright and license
 * information, please view the LICENSE file which was distributed with this
 * source code.
 */

/**
 * Central registry for all components known to Grinder
 */
const registry: Map<string, ComponentType<any>> = new Map();

/**
 * @private
 * @param string key
 * @return ComponentType<any>
 */
export function get(key: string): ComponentType<any> {
	if (!registry.has(key)) {
		throw new Error(`[Grinder]: No component has been registered for key "${key}".`);
	}

	return registry.get(key) as ComponentType<any>;
}

/**
 * @public
 * @param string key
 * @param ComponentType implementation?
 * @return ComponentType<any> | (implementation: ComponentType<any>) => ComponentType<any>
 */
export default function register(key: string, implementation?: ComponentType<any>) {
	if (implementation) {
		registry.set(key, implementation);
		return implementation;
	}

	return function registerDecorator(implementation: ComponentType<any>) {
		registry.set(key, implementation);
		return implementation;
	}
}

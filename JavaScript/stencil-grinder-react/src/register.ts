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
const registry: Map<string, ComponentType> = new Map();

/**
 * @private
 * @param string key
 * @return ComponentType
 */
export function get(key: string): ComponentType {
	if (!registry.has(key)) {
		throw new Error(`[Grinder]: No component has been registered for key "${key}".`);
	}

	return registry.get(key) as ComponentType;
}

/**
 * @public
 * @param string key
 * @param ComponentType implementation?
 * @return ComponentType | (implementation: ComponentType) => ComponentType
 */
export default function register(key: string, implementation?: ComponentType) {
	if (implementation) {
		registry.set(key, implementation);
		return implementation;
	}

	return function registerDecorator(implementation: ComponentType) {
		registry.set(key, implementation);
		return implementation;
	}
}

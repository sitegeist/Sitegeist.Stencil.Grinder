import React from "react";
import { GrinderResponse } from "@sitegeist/stencil-grinder-shared";

import { get } from "./register";

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

interface GrinderProps {
    data: GrinderResponse | object | any[] | string
}

/**
 * @public
 * @param GrinderProps props
 * @return JSX.Element[] | undefined
 */
export default function Grinder(props: GrinderProps) {
	if (Array.isArray(props.data)) {
		return (
			<>
				{props.data.map((item, index) => (
					<Grinder key={item.key || index} data={item}/>
				))}
			</>
		);
	}

	if (typeof props.data === 'object' && props.data !== null && 'type' in props.data) {
		switch (props.data.type) {
			case 'Sitegeist.Stencil.Grinder/v1/INDEX':
				throw new Error(`[Grinder]: Cannot render index. The index is not supposed to be rendered.`);

			case 'Sitegeist.Stencil.Grinder/v1/COMMAND':
				throw new Error(`[Grinder]: Cannot render command "${props.data.payload.directive}". Please make sure to handle commands before rendering.`);

			case 'Sitegeist.Stencil.Grinder/v1/DOCUMENT':
				return (<Grinder data={props.data.payload}/>);

			case 'Sitegeist.Stencil.Grinder/v1/NODE': {
				const Component = get(props.data.payload.component);

				if (Component) {
					return (<Component {...props.data.payload.props} />);
				}

				throw new Error(`[Grinder]: Could not find component: ${props.data.payload.component}`);
			}

			default: break;
		}
	}

	throw new Error(`[Grinder]: Could not unravel data structue: ${JSON.stringify(props.data)}.`);
}

const components = new Map()

export function register(componentIdentifier, ComponentImplementation) {
	components.set(componentIdentifier, ComponentImplementation);

	return ComponentImplementation;
}

export function Grinder({ data }) {
	if (Array.isArray(data)) {
		return data.map((item, index) => <Grinder key={item.key || index} data={item}/>);
	} else if (typeof data === 'object' && data !== null && 'type' in data) {
		switch (data.type) {

			case 'Sitegeist.Stencil.Grinder/v1/DOCUMENT':
				return (<Grinder data={data.payload}/>);

			case 'Sitegeist.Stencil.Grinder/v1/NODE': {
				const ComponentImplementation = components.get(data.payload.component);

				if (ComponentImplementation) {
					return (<ComponentImplementation {...data.payload.props} />);
				}

				throw new Error(`[Grinder]: Could not find component: ${data.payload.component}`);
			}

			case 'Sitegeist.Stencil.Grinder/v1/COMMAND':
				throw new Error(`[Grinder]: Cannot render command.`);

			default: break;
		}
	} else {
		return <div>Nothing</div>;
	}

	throw new Error(`[Grinder]: Could not unravel data structue: ${JSON.stringify(data)}.`);
}

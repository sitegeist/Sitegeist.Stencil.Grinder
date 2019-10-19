import React from 'react';

import { Grinder, register } from '@sitegeist/stencil-grinder-react';


export default register('Vendor.Site:Content.Text', function Text({ text }) {
	if (typeof text === 'string') {
		return (
			<div dangerouslySetInnerHTML={{ __html: text }} />
		);
	}

	return (
		<div>
			<Grinder data={text}/>
		</div>
	)
});

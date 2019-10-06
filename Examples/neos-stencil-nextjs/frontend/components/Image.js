import React from 'react';

import { Grinder, register } from '../src/client';


export default register('Vendor.Site:Content.Image', function Image({ src, alt, title }) {
	return (
		<img
			style={{ maxWidth: '100%' }}
			src={src}
			alt={alt}
			title={title}
			/>
	);
});

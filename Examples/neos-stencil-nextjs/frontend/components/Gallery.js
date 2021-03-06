import React from 'react';
import ImageGallery from 'react-image-gallery';

import {register} from '@sitegeist/stencil-grinder-react';

import 'react-image-gallery/styles/css/image-gallery.css';

export default register('Vendor.Site:Content.Gallery', function Gallery({ children }) {
	return (
		<ImageGallery
			items={children.map(child => ({
				original: child.payload.props.image,
				thumbnail: child.payload.props.image
			}))}
			/>
	);
});

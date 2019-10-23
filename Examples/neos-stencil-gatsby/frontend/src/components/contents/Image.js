import React from "react";
import { Box, Image as Img } from "rebass";
import { register } from "@sitegeist/stencil-grinder-react";

function Image(props) {
	return (
		<Box as="figure" mb={3}>
			<Img
				src={props.image}
				alt={props.alternativeText}
				title={props.title}
				/>
		</Box>
	);
}

register(
	'Vendor.Site:Content.Image',
	Image
);

import React from "react";
import { Box } from "rebass";
import { register } from "@sitegeist/stencil-grinder-react";

function Text(props) {
	return (
		<Box
			mb={3}
			dangerouslySetInnerHTML={{ __html: props.text }}
		/>
	)
}

register(
	'Vendor.Site:Content.Text',
	Text
);

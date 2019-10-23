import React, { useState } from "react";
import { Box } from "rebass";
import { Grinder, register } from "@sitegeist/stencil-grinder-react";

function FaqStage(props) {
	const [expanded, setExpanded] = useState(0);

	return (
		<Box as="section" width={1200} mx="auto" py={6}>
			<div dangerouslySetInnerHTML={{ __html: props.title }}/>
			<Grinder
				data={props.children}
				props={{ expanded, setExpanded }}
				/>
		</Box>
	);
}

export default register(
	'Vendor.Site:Content.FaqStage',
	FaqStage
);

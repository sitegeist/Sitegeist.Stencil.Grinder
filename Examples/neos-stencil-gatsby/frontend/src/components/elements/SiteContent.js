import React from "react";
import { Box } from "rebass";

export default function SiteContent(props) {
	return (
		<Box
			mb={100}
			width={props.width}
			mx={props.width ? 'auto' : undefined}
			backgroundColor="white"
			sx={{ position: 'relative', zIndex: 1 }}
			>
			{props.children}
		</Box>
	);
}

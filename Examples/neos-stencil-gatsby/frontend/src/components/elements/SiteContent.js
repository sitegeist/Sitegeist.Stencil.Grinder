import React from "react";
import { Box } from "rebass";

export default function SiteContent(props) {
	return (
		<Box
			mb={100}
			backgroundColor="white"
			sx={{ position: 'relative', zIndex: 1 }}
			>
			{props.children}
		</Box>
	);
}

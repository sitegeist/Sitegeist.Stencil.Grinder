import React from "react";
import { Flex, Box } from "rebass";

export default function SiteFooter(props) {
	return (
		<Box
			as="footer"
			backgroundColor="#222"
			color="#fff"
			width={1}
			height={100}
			sx={{
				position: 'fixed',
				bottom: 0,
				left: 0,
				zIndex: 0
			}}
		>
			<Flex
				alignItems="center"
				width={1200}
				height="100%"
				mx="auto"
				dangerouslySetInnerHTML={{ __html: props.text }}
				/>
		</Box>
	);
}

import React from "react";
import { Flex, Box, Text } from "rebass";
import { register } from "@sitegeist/stencil-grinder-react";

function HeroStage(props) {
	return (
		<Box sx={{ backgroundImage: `url(${props.image})` }}>
			<Flex
				width={1200}
				height="100vh"
				maxHeight={1080}
				mx="auto"
				justifyContent="center"
				alignItems="center"
				>
				{props.text && (
					<Text
						p={4}
						fontSize={6}
						sx={{
							color: 'white',
							backgroundColor: 'rgba(0, 0, 0, .5)'
						}}
						dangerouslySetInnerHTML={{ __html: props.text }}
						/>
				)}
			</Flex>
		</Box>
	);
}

export default register(
	'Vendor.Site:Content.HeroStage',
	HeroStage
);

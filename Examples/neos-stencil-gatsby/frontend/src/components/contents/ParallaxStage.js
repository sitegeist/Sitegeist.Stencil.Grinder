import React from "react";
import { Flex, Box, Image } from "rebass";
import { ScrollPercentage } from "react-scroll-percentage";
import { register } from "@sitegeist/stencil-grinder-react";

function ParallaxStage(props) {
	return (
		<ScrollPercentage>
			{({ percentage, ref }) => (
				<div ref={ref} style={{ position: 'relative' }}>
					<Image
						sx={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							objectPosition: `center ${percentage * 500}px `,
							marginBottom: '2em'
						}}
						role="presentation"
						src={props.image}
						alt=""
					/>
					<div style={{ height: '50vh' }} />
					{props.children.map((child, index) => (
						<Flex
							as="section"
							backgroundColor="white"
							opacity={percentage / (.25 + (.1 * (index + 1)))}
							width={1200}
							mx="auto"
							my={6}
							sx={{
								position: 'relative',
								zIndex: 10
							}}
						>
							<Box
								width={1 / 2}
								order={index % 2 ? 1 : 2}
								p={5}
								dangerouslySetInnerHTML={{ __html: child.payload.props.text }}
								/>
							<Box width={1 / 2} order={index % 2 ? 2 : 1}>
								<Image
									sx={{
										width: '100%',
										minHeight: '300px',
										objectFit: 'cover',
										display: 'block'
									}}
									src={child.payload.props.image}
									alt={child.payload.props.alternativeText}
									title={child.payload.props.title}
								/>
							</Box>
						</Flex>
					))}
					<div style={{ height: '50vh' }} />
				</div>
			)}
		</ScrollPercentage>
	);
}

export default register(
	'Vendor.Site:Content.ParallaxStage',
	ParallaxStage
);

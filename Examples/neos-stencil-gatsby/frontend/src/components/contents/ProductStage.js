import React from "react";
import { Flex, Box, Heading, Card, Image } from "rebass";
import { register } from "@sitegeist/stencil-grinder-react";

function ProductStage(props) {
	return (
		<Box as="section">
			<Box width={1200} mx="auto">
				<Flex py={6} justifyContent="space-between">
					{props.children.map(child => (
						<Box width={200} px={0} mx={0}>
							<Card
								sx={{
									borderRadius: 2
								}}>
								<Image
									sx={{
										width: '100%',
										height: '200px',
										objectFit: 'contain',
										marginBottom: '2em'
									}}
									src={child.payload.props.image}
									alt={child.payload.props.alternativeText}
									title={child.payload.props.title}
								/>
								<Box px={2}>
									<Heading
										as='h3'
										textAlign='center'
										dangerouslySetInnerHTML={{
											__html: child.payload.props.text
										}}
										/>
								</Box>
							</Card>
						</Box>
					))}
				</Flex>
			</Box>
		</Box>
	);
}

export default register(
	'Vendor.Site:Content.ProductStage',
	ProductStage
);

import React from "react";
import { Sticky } from "react-sticky";
import { Flex, Box, Image } from "rebass";

export default function SiteHeader() {
	return (
		<Sticky topOffset={20} disableCompensation>
			{({style, isSticky}) => (
				<Box
					as="header"
					sx={{
						...style,
						position: 'fixed',
						top: 0,
						left: 0,
						width: '100%',
						backgroundColor: isSticky ? '#222' : 'transparent',
						transition: 'background-color .5s'
					}}
				>
					<Flex width={1200} height="4em" mx="auto" alignItems="center">
						<Image
							src="/logo-sitegeist-bright.png"
							alt="Sitegeist Logo"
							height="2em"
							/>
					</Flex>
				</Box>
			)}
		</Sticky>
	);
}

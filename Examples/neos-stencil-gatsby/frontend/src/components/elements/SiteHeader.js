import React, { useState } from "react";
import { Sticky } from "react-sticky";
import { Flex, Box, Image, Button } from "rebass";
import { IoIosMenu } from "react-icons/io";

import Drawer from "./Drawer";
import Navigation from "./Navigation";

export default function SiteHeader(props) {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Drawer width={200} open={open} setOpen={setOpen}>
				<Navigation
					items={[
						{ href: '/', label: 'Home' },
						...props.navigation
					]}
				/>
			</Drawer>
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
							backgroundColor: isSticky || props.static ? '#222' : 'transparent',
							transition: 'background-color .5s',
							zIndex: 100
						}}
					>
						<Flex
							width={1200}
							height="4em"
							mx="auto"
							alignItems="center"
							justifyContent="space-between"
							>
							<Image
								src="/logo-sitegeist-bright.png"
								alt="Sitegeist Logo"
								height="2em"
								/>
							<Button
								backgroundColor="transparent"
								fontSize={5}
								sx={{
									cursor: 'pointer',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center'
								}}
								onClick={() => setOpen(!open)}
								>
								<IoIosMenu/>
							</Button>
						</Flex>
					</Box>
				)}
			</Sticky>
		</>
	);
}

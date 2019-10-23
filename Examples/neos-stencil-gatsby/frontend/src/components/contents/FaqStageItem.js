import React from "react";
import { motion } from "framer-motion";
import { Box, Text } from "rebass";
import { register } from "@sitegeist/stencil-grinder-react";

function FaqStageItem(props) {
	const isOpen = props.grinder.index === props.expanded;

	return (
		<>
			<motion.header
				initial={false}
				animate={{
					backgroundColor: isOpen ? "#222" : "#eee",
					color: isOpen ? "#fff" : "#000"
				}}
				onClick={() => props.setExpanded(isOpen ? false : props.grinder.index)}
			>
				<Box
					p={2}
					sx={{ cursor: 'pointer' }}
					dangerouslySetInnerHTML={{ __html: props.title }}
					/>
			</motion.header>
			<motion.section
				animate={{
					opacity: isOpen ? 1 : 0,
					height: isOpen ? 'auto' : 0,
					overflow: 'hidden'
				}}
				transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
			>
				<Box p={2} dangerouslySetInnerHTML={{ __html: props.text }}/>
			</motion.section>
		</>
	);
}

export default register(
	'Vendor.Site:Content.FaqStage.Item',
	FaqStageItem
);

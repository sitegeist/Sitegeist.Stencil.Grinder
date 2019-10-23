import React from "react";
import { Box } from "rebass";

export default function Drawer(props) {
	return (
		<>
			<Box
				sx={{
					position: 'fixed',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					zIndex: props.open ? 2000 : 0,
					backgroundColor: props.open ? 'rgba(0, 0, 0, .9)' : 'transparent',
					transition: `background-color .1s .3s${props.open ? ', z-index 0 .3s' : ''}`,
					cursor: 'pointer'
				}}
				onClick={() => props.setOpen(!props.open)}
			/>
			<Box
				width={props.width}
				sx={{
					position: 'fixed',
					top: 0,
					left: -props.width,
					bottom: 0,
					zIndex: 2000,
					backgroundColor: 'white',
					boxShadow: props.open ? '1px 0 3px rgba(0, 0, 0, .9)' : 'none',
					transform: props.open ? `translateX(${props.width}px)` : 'none',
					transition: 'transform .3s, box-shadow .3s'
				}}
			>
				{props.children}
			</Box>
		</>
	);
}

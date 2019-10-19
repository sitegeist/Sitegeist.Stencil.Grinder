import React, { useState } from 'react';

import { Grinder, register } from '@sitegeist/stencil-grinder-react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

export default register('Vendor.Site:Navigation', function Navigation({ items }) {
	const classes = useStyles();
	const [isOpen, setIsOpen] = useState(false);

	function toggleDrawer() {
		setIsOpen(!isOpen);
	}

	return (
		<>
			<Drawer open={isOpen} onClose={toggleDrawer}>
				<List>
					{items.map(item => (
						<ListItem key={item.label}>
							<Link href={item.href}>
								{item.label}
							</Link>
						</ListItem>
					))}
				</List>
			</Drawer>
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<IconButton onClick={toggleDrawer} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							Example Page
						</Typography>
					</Toolbar>
				</AppBar>
			</div>
		</>
	);
});

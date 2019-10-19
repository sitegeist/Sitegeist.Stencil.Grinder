import React from 'react';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import { Grinder } from '@sitegeist/stencil-grinder-react';

import '../components/Page';
import '../components/Text';
import '../components/Image';
import '../components/Navigation';
import '../components/Gallery';

export default class extends React.Component {
	static getInitialProps({ query }) {
		return { data: query.data };
	}

	render() {
		return (
			<Container maxWidth="sm">
				<Box my={4}>
					<Grinder data={this.props.data}/>
				</Box>
			</Container>
		);
	}
}

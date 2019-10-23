import React from "react";
import { Grinder } from "@sitegeist/stencil-grinder-react";
import { Helmet } from "react-helmet";
import { createGlobalStyle } from "styled-components"

import "../components";

const GlobalStyle = createGlobalStyle`
	body {
		padding: 0;
		margin: 0;
		-webkit-font-smoothing: none;
		font-family: 'Roboto', sans-serif;
	}

	h1, h2, h3, h4, h5, h6 {
		font-family: 'Roboto', sans-serif!important;
	}

	h3 {
		margin: 0;
	}
`;

export default ({ pageContext: {root} }) => (
	<>
		<Helmet>
			<link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet"/>
		</Helmet>
		<GlobalStyle/>
		<Grinder data={root} />
	</>
);

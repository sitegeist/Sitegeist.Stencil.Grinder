import React from "react";
import { StickyContainer } from "react-sticky";
import { register } from "@sitegeist/stencil-grinder-react";

import { Heading } from "rebass";

import SiteHeader from "../elements/SiteHeader";

function HomePage(props) {
	return (
		<StickyContainer>
			<SiteHeader/>
			<Heading as="h1">Hello World!</Heading>
			<pre>{JSON.stringify(props, null, 2)}</pre>
			<pre>{JSON.stringify(props, null, 2)}</pre>
			<pre>{JSON.stringify(props, null, 2)}</pre>
			<pre>{JSON.stringify(props, null, 2)}</pre>
			<pre>{JSON.stringify(props, null, 2)}</pre>
			<pre>{JSON.stringify(props, null, 2)}</pre>
			<pre>{JSON.stringify(props, null, 2)}</pre>
			<pre>{JSON.stringify(props, null, 2)}</pre>
			<pre>{JSON.stringify(props, null, 2)}</pre>
			<pre>{JSON.stringify(props, null, 2)}</pre>
			<pre>{JSON.stringify(props, null, 2)}</pre>
			<pre>{JSON.stringify(props, null, 2)}</pre>
			<pre>{JSON.stringify(props, null, 2)}</pre>
			<pre>{JSON.stringify(props, null, 2)}</pre>
			<pre>{JSON.stringify(props, null, 2)}</pre>
			<pre>{JSON.stringify(props, null, 2)}</pre>
			<pre>{JSON.stringify(props, null, 2)}</pre>
			<pre>{JSON.stringify(props, null, 2)}</pre>
			<pre>{JSON.stringify(props, null, 2)}</pre>
		</StickyContainer>
	);
}

export default register(
	'Vendor.Site:Document.HomePage',
	HomePage
);

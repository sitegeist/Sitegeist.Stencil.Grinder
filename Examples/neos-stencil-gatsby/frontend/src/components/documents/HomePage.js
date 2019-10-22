import React from "react";
import { StickyContainer } from "react-sticky";
import { Grinder, register } from "@sitegeist/stencil-grinder-react";

import { Heading } from "rebass";

import SiteHeader from "../elements/SiteHeader";

function HomePage(props) {
	return (
		<StickyContainer>
			<SiteHeader/>
			<Grinder data={props.main}/>
		</StickyContainer>
	);
}

export default register(
	'Vendor.Site:Document.HomePage',
	HomePage
);

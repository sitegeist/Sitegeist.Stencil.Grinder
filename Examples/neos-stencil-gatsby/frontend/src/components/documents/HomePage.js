import React from "react";
import { StickyContainer } from "react-sticky";
import { Helmet } from "react-helmet";
import { Grinder, register } from "@sitegeist/stencil-grinder-react";

import SiteHeader from "../elements/SiteHeader";
import SiteContent from "../elements/SiteContent";
import SiteFooter from "../elements/SiteFooter";

function HomePage(props) {
	return (
		<>
			<Helmet>
				<title>{props.title}</title>
			</Helmet>
			<StickyContainer>
				<SiteHeader/>
				<SiteContent>
					<Grinder data={props.main}/>
				</SiteContent>
				<SiteFooter text={props.footerText}/>
			</StickyContainer>
		</>
	);
}

export default register(
	'Vendor.Site:Document.HomePage',
	HomePage
);

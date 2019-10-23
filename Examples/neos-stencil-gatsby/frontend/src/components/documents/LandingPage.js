import React from "react";
import { StickyContainer } from "react-sticky";
import { Helmet } from "react-helmet";
import { Grinder, register } from "@sitegeist/stencil-grinder-react";

import SiteHeader from "../elements/SiteHeader";
import SiteContent from "../elements/SiteContent";
import SiteFooter from "../elements/SiteFooter";

function LandingPage(props) {
	return (
		<>
			<Helmet>
				<title>{props.title}</title>
			</Helmet>
			<StickyContainer>
				<SiteHeader navigation={props.navigation}/>
				<SiteContent>
					<Grinder data={props.main}/>
				</SiteContent>
				<SiteFooter text={props.footerText}/>
			</StickyContainer>
		</>
	);
}

register(
	'Vendor.Site:Document.LandingPage',
	LandingPage
);

register(
	'Vendor.Site:Document.HomePage',
	LandingPage
);

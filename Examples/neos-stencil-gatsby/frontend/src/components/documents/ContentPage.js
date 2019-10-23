import React from "react";
import { Box } from "rebass";
import { StickyContainer } from "react-sticky";
import { Helmet } from "react-helmet";
import { Grinder, register } from "@sitegeist/stencil-grinder-react";

import SiteHeader from "../elements/SiteHeader";
import SiteContent from "../elements/SiteContent";
import SiteFooter from "../elements/SiteFooter";

function ContentPage(props) {
	return (
		<>
			<Helmet>
				<title>{props.title}</title>
			</Helmet>
			<StickyContainer>
				<SiteHeader static navigation={props.navigation} />
				<SiteContent>
					<Box
						py={6}
						width={960}
						mx="auto"
					>
						<Grinder data={props.main}/>
					</Box>
				</SiteContent>
				<SiteFooter text={props.footerText} />
			</StickyContainer>
		</>
	);
}

register(
	'Vendor.Site:Document.ContentPage',
	ContentPage
);

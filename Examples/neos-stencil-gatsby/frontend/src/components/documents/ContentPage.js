import React from "react";
import { StickyContainer } from "react-sticky";
import { Helmet } from "react-helmet";
import { Grinder, register } from "@sitegeist/stencil-grinder-react";

import SiteHeader from "../elements/SiteHeader";
import SiteContent from "../elements/SiteContent";
import SiteFooter from "../elements/SiteFooter";

function ContentPage(props) {
	return (<pre>{JSON.stringify(props, null, 2)}</pre>);
}

export default register(
	'Vendor.Site:Document.ContentPage',
	ContentPage
);

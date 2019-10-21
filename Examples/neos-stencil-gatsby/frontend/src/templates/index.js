import React from "react";
import { Grinder } from "@sitegeist/stencil-grinder-react";

export default ({ pageContext: {root} }) => (
	<Grinder data={root} />
);

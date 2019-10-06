import React from 'react';
import Head from 'next/head';

import { Grinder, register } from '../src/client';

export default register('Vendor.Site:Document.Page', function Page({ title, navigation, children }) {
	return (
		<div>
			<Head>
				<title>{title}</title>
			</Head>
			<Grinder data={navigation}/>
			<Grinder data={children}/>
		</div>
	);
});

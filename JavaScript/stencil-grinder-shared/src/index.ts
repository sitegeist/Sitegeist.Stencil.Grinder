/**
 * This file is part of the Sitegeist.Stencil.Grinder package
 *
 * (c) 2019
 * Wilhelm Behncke <behncke@sitegeist.de>
 *
 * This package is Open Source Software. For the full copyright and license
 * information, please view the LICENSE file which was distributed with this
 * source code.
 */

export interface GrinderDocument {
	type: 'Sitegeist.Stencil.Grinder/v1/DOCUMENT'
	payload: GrinderNode
}

export interface GrinderCommand {
	type: 'Sitegeist.Stencil.Grinder/v1/COMMAND'
	payload: {
		directive: string
		options: object
	}
}

export interface GrinderNode {
	type: 'Sitegeist.Stencil.Grinder/v1/NODE'
	payload: {
		component: string
		props: object
	}
}

export interface GrinderDocumentIndex {
	type: 'Sitegeist.Stencil.Grinder/v1/INDEX'
	payload: GrinderDocumentIndexEntry[]
}

export interface GrinderDocumentIndexEntry {
	url: string
}

export type GrinderResponse =
	GrinderDocument |
	GrinderCommand |
	GrinderNode |
	GrinderDocumentIndex;

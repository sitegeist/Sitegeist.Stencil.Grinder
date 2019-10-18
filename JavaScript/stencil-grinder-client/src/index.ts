import URI from 'urijs';

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

interface GrinderClientConfiguration {
	endpoint: string
	defaultUriSuffix?: string
}

interface GrinderDocument {
	type: 'Sitegeist.Stencil.Grinder/v1/DOCUMENT'
	payload: GrinderNode
}

interface GrinderCommand {
	type: 'Sitegeist.Stencil.Grinder/v1/COMMAND'
	payload: {
		directive: string
		options: object
	}
}

interface GrinderNode {
	type: 'Sitegeist.Stencil.Grinder/v1/NODE'
	payload: {
		component: string
		props: object
	}
}

interface GrinderDocumentIndex {
	type: 'Sitegeist.Stencil.Grinder/v1/INDEX'
	payload: GrinderDocumentIndexEntry[]
}

interface GrinderDocumentIndexEntry {
	url: string
}

interface GrinderContentContext {
	workspace: string
	dimensions: { [key: string]: string[] }
}

/**
 * The Sitegeist.Stencil.Grinder JavaScript client
 */
class GrinderClient {

	/**
	 * Constructor
	 *
	 * @param GrinderClientConfiguration configuration
	 */
	constructor(private configuration: GrinderClientConfiguration) {
	}

	/**
	 * @param string unsanitizedPath
	 * @return string
	 */
	private sanitizePath(unsanitizedPath: string): string {
		let path = unsanitizedPath;

		while (path.startsWith('/')) {
			path = path.substr(1);
		}

		if (this.configuration.defaultUriSuffix) {
			if (path.endsWith(this.configuration.defaultUriSuffix)) {
				path = path.slice(0, -this.configuration.defaultUriSuffix.length);
			}
		}

		return path;
	}

	/**
	 * @param string filter
	 * @return Promise<GrinderDocumentIndex>
	 */
	public async fetchIndex(filter?: string): Promise<GrinderDocumentIndex>
	{
		try {
			const uri = URI(this.configuration.endpoint)
				.path(`${URI(this.configuration.endpoint).path()}/index`)
				.query({ filter })
				.valueOf();
			const response = await fetch(uri);
			const json = await response.json();

			if (json.type === 'Sitegeist.Stencil.Grinder/v1/INDEX') {
				return json as GrinderDocumentIndex;
			}

			throw new Error(`[GrinderClient]: Response was not a valid index: ${JSON.stringify(json, null, 2)}`);
		} catch (error) {
			throw new Error(`[GrinderClient]: Failed to fetch index due to: ${error}`);
		}
	}

	/**
	 * @param string path
	 * @param object additionalParameters
	 * @return Promise<GrinderDocument | GrinderCommand>
	 */
	public async fetchDocument(path: string, additionalParameters: object = {}): Promise<GrinderDocument | GrinderCommand>
	{
		try {
			const uri = URI(this.configuration.endpoint)
				.path(`${URI(this.configuration.endpoint).path()}/document/${this.sanitizePath(path)}`)
				.query(additionalParameters)
				.valueOf();
			const response = await fetch(uri);
			const json = await response.json();

			if (json.type === 'Sitegeist.Stencil.Grinder/v1/DOCUMENT') {
				return json as GrinderDocument;
			}

			if (json.type === 'Sitegeist.Stencil.Grinder/v1/COMMAND') {
				return json as GrinderCommand;
			}

			throw new Error(`[GrinderClient]: Response was neither a valid document nor a valid command: ${JSON.stringify(json, null, 2)}`);
		} catch (error) {
			throw new Error(`[GrinderClient]: Failed to fetch document "${path}" due to: ${error}`);
		}
	}

	/**
	 * @param string identifier
	 * @param GrinderContentContext context
	 * @param object additionalParameters
	 * @return Promise<GrinderNode>
	 */
	public async fetchNode(identifier: string, context: Partial<GrinderContentContext> = {}, additionalParameters: object = {}): Promise<GrinderNode>
	{
		try {
			const uri = URI(this.configuration.endpoint)
				.path(`${URI(this.configuration.endpoint).path()}/node`)
				.query({
					identifier,
					workspace: context.workspace || 'live',
					dimensions: context.dimensions || [],
					...additionalParameters
				})
				.valueOf();
			const response = await fetch(uri);
			const json = await response.json();

			if (json.type === 'Sitegeist.Stencil.Grinder/v1/NODE') {
				return json as GrinderNode;
			}

			throw new Error(`[GrinderClient]: Response was not a valid node: ${JSON.stringify(json, null, 2)}`);

		} catch (error) {
			throw new Error(`[GrinderClient]: Failed to fetch node "${identifier}" in context "${JSON.stringify(context)}" due to: ${error}`);
		}
	}
}

/**
 * @param GrinderClientConfiguration configuration
 * @return GrinderClient
 */
export default function createClient(configuration: GrinderClientConfiguration): GrinderClient {
	return new GrinderClient(configuration);
}

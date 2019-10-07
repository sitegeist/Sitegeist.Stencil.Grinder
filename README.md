# Sitegeist.Stencil.Grinder

> This package will allow you to provide a JSON API to any rendering service in the frontend, while retaining a fusion-based integration workflow.

**This is WIP, everything in here may change or turn out to be a bad idea at all.**

## Authors & Sponsors

* Wilhelm Behncke - behncke@sitegeist.de
* Martin Ficzel - ficzel@sitegeist.de

*The development and the public-releases of this package is generously sponsored by our employer https://www.sitegeist.de.*

## Run Example

```
make run
```

* The neos backend is available under `http://127.0.0.1:8081/neos`, use the credentials `User: admin, PW: admin`
* The next.js-driven frontend is available under `http://127.0.0.1:8081`

## TODOs

- [ ] Error Handling
- [ ] Make fusionPath configurable
- [ ] Extract JS Client into separate package

## JSON API

Example response:
```
{
  "type": "Sitegeist.Stencil.Grinder/v1/DOCUMENT",
  "payload": {
    "type": "Sitegeist.Stencil.Grinder/v1/NODE",
    "payload": {
      "component": "Vendor.Site:Document.Page",
      "props": {
        "label": "Vendor.Site",
        "title": "Vendor.Site",
        "navigation": {
          "type": "Sitegeist.Stencil.Grinder/v1/NODE",
          "payload": {
            "component": "Vendor.Site:Navigation",
            "props": {
              "items": [
                {
                  "label": "Example #1",
                  "href": "/example-1.html"
                },
                {
                  "label": "Example #2",
                  "href": "/example-2.html"
                },
                {
                  "label": "Example #3",
                  "href": "/example-3.html"
                },
                {
                  "label": "Shortcut Test",
                  "href": "/"
                }
              ]
            }
          }
        },
        "children": [
          {
            "type": "Sitegeist.Stencil.Grinder/v1/NODE",
            "payload": {
              "component": "Vendor.Site:Content.Image",
              "props": {
                "src": "http://127.0.0.1:8080/_Resources/Persistent/3/a/6/1/3a61078b36015247e24533dade3d80e2d7c41df7/bay-beach-beautiful-2071518-3567x2005-2560x1439.jpg"
              }
            }
          },
          {
            "type": "Sitegeist.Stencil.Grinder/v1/NODE",
            "payload": {
              "component": "Vendor.Site:Content.Text",
              "props": {
                "text": "<h1>Sitegeist.Stencil.Grinder</h1><p>This package allows you to provide a JSON API to any rendering service in the frontend, while retaining a fusion-based integration workflow.&nbsp;</p>"
              }
            }
          }
        ]
      }
    }
  }
}
```

### Document

```
{
  "type": "Sitegeist.Stencil.Grinder/v1/DOCUMENT",
  "payload": {...}
}
```

### Node

```
{
  "type": "Sitegeist.Stencil.Grinder/v1/NODE",
  "payload": {
    "component": "Vendor.Site:Content.Image",
    "props": {...}
  }
}
```

### Command

```
{
  "type": "Sitegeist.Stencil.Grinder/v1/COMMAND",
  "payload": {
    "directive": "REDIRECT",
    "options": {...}
  }
}
```

## JavaScript Client

```js
import React from 'react';
import { Grinder, register } from '@sitegeist/stencil-grinder-client';

export default register('Vendor.Site:Content.Stage', function Stage({ headline, children }) {
	return (
        <section>
            <header>
                <h2>{headline}</h2>
            </header>
            <Grinder data={children}/>
        </section>
	);
});
```
## License

see [LICENSE](./LICENSE) file.

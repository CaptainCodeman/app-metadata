# app-metadata

`app-metadata` is a module to help manage page metadata for Search Engine
Optimization (SEO) and social sharing (e.g. Twitter cards, OpenGraph).

It will add and remove `<meta>` elements in the page `<head>` section based
on the JSON object passed to it. This can update page titles while a use
navigates a Single Page Application (SPA) or Progressive Web App (PWA) or
set the values to be Server-Side Rendered (e.g. using puppeteer).

Any `title` key will be used to set the page title. `description`,
`image` and `url` keys will set the `og:...` and `twitter:...` meta
values and any other key will be used directly.

The `name` attribute is used for the `<meta>` tag unless the key is for an
OpenGraph value in which case the `property` attribute will be set. i.e.

`twitter:image` metadata will set <meta name="twitter:image" content="...">
`og:image` metadata will set <meta property="og:image" content="...">

## Usage

Import `updateMetadata` and call as required:

```
import { updateMetadata } from 'app-metadata';

updateMetadata({
    title: 'This is the page title',
    description: 'This is the page description',
    keywords: 'these,are,keywords',
    image: 'https://www.example.com/myimage.jpg',
})
```

Alternatively, use `addMetadataListener` to register a listener and raise
`app-metadata` CustomEvent with the metadata in the event detail:

```
import { addMetadataListener } from 'app-metadata';

addMetadataListener()

// elsewhere ...

this.dispatchEvent(new CustomEvent({
    bubbles: true,
    composed: true,
    detail: {
        title: 'This is the page title',
        description: 'This is the page description',
        keywords: 'these,are,keywords',
        image: 'https://www.example.com/myimage.jpg',
    },
}))
```

## Demonstration

To demonstrate this approach does work for SEO I've created a very
[simple test site](http://app-metadata.appspot.com/) using the polymer-cli
and added some content with the meta html headers set for each view using
this `<app-metadata>` element.

Here's the meta data set for the main view:

    this.fire('app-metadata', {
        title: 'Why use Agile Project Management?',
        description: 'How Agile Project Management Methodologies help compared to the old Waterfall approach to Project Management',
        keywords: 'scrum, scrum master, agile, training, certification, professional, certified, CSM, PSM'
    });

This view has been successfully indexed by Google and [appears correctly in the search results](https://www.google.ca/search#q=site%3Aapp-metadata.appspot.com):

![Example](https://cloud.githubusercontent.com/assets/304910/16563503/be298c16-41bf-11e6-8ac8-fdc53d4e614d.png)


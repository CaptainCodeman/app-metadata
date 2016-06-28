_[Demo and API docs](http://captaincodeman.github.io/app-metadata/)_

##&lt;app-metadata&gt;

`app-metadata` is a singleton element used to manage page meta-data for Search Engine Optimization (SEO).
It will add and remove `<meta>` elements to the page `<head>` section based on the JSON object passed
to it.

In order to make use of the meta data manager, it is best to request it's availability in the app element.

Example:

    Polymer({
      is: 'my-app',
      attached: function() {
        // this will create the singleton element if it has not been created yet
        Polymer.AppMetadata.requestAvailability();
      }
    });

After the `app-metadata` has been made available, elements can update the meta by firing bubbling `app-metadata`
events.

Example:

    this.fire('app-metadata', {
      title: 'This is the page title',
      description: 'This is the page description',
      keywords: 'these,are,keywords'
    });

Alternatively, create an instance of the `app-metadata` element and set it's `data` property.

Example:

    var meta = document.createElement('app-metadata');
    meta.data = {
      title: 'This is the page title',
      description: 'This is the page description',
      keywords: 'these,are,keywords'
    };

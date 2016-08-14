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

##Demonstration

To demonstrate this approach does work I've created a very [simple test site](http://app-metadata.appspot.com/)
using the polymer-cli and added some content with the meta html headers set for each view using this `<app-metadata>` element.

Here's the meta data set for the main view:

    this.fire('app-metadata', {
        title: 'Why use Agile Project Management?',
        description: 'How Agile Project Management Methodologies help compared to the old Waterfall approach to Project Management',
        keywords: 'scrum, scrum master, agile, training, certification, professional, certified, CSM, PSM'
    });

This view has been successfully indexed by Google and [appears correctly in the search results](https://www.google.ca/search#q=site%3Aapp-metadata.appspot.com):

![Example](https://cloud.githubusercontent.com/assets/304910/16563503/be298c16-41bf-11e6-8ac8-fdc53d4e614d.png)


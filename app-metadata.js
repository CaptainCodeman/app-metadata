/**
 * `app-metadata` is a singleton element used to manage page meta-data
 * for Search Engine Optimization (SEO). It will add and remove `<meta>`
 * elements to the page `<head>` section based on the JSON object passed
 * to it.
 *
 * In order to make use of the meta data manager, it is best to request
 * it's availability in the app element or index.html page or to add an
 * instance directly to either.
 *
 * Example:
 *
 * ```js
 * class MyApp extends Polymer.Element {
 *   static get is() {return 'my-app'}
 *   constructor() {
 *     super();
 *     AppMetadata.requestAvailability();
 *   }
 * }
 * ```
 *
 * OR
 *
 * ```html
 * <app-metadata></app-metadata>
 * ```
 *
 * After the `app-metadata` has been made available, elements can update
 * the meta by firing bubbling `app-metadata` events.
 *
 * Example:
 *
 * ```js
 * var event = new CustomEvent('app-metadatat', {
 *   bubbles: true,
 *   composed: true,
 *   title: 'This is the page title',
 *   description: 'This is the page description',
 *   keywords: 'these, are, keywords'
 * });
 * this.dispatchEvent(event);
 * ```
 *
 * Alternatively, set the data property of the created instance:
 *
 * Example:
 *
 * ```js
 * AppMetadata.instance.data = {
 *   title: 'This is the page title',
 *   description: 'This is the page description',
 *   keywords: 'these,are,keywords'
 * };
 * ```
 *
 * @group App Elements
 * @demo demo/index.html
 *
 */
class AppMetadata extends HTMLElement {
  constructor() {
    super();

    this._data = {};
    this._meta = {};

    if (!AppMetadata.instance) {
      AppMetadata.instance = this;
    }

    document.body.addEventListener('app-metadata', this._onAppMetadata.bind(this));
  }

  _onAppMetadata(e) {
    if (e.detail && typeof e.detail === 'object') {
      this.data = e.detail;
    }
  }

  get data() { return this._data; }
  set data(val) {
    this._data = val;
    this.reflectToDocument();
  }

  reflectToDocument() {
    var names = [];
    for (var name in this._data) {
      if (this._data.hasOwnProperty(name)) {
        // title is a special case
        if (name === 'title') {
          document.title = this._data[name];
        } else {
          // re-use any already-created meta-tags if possible
          if (this._meta.hasOwnProperty(name)) {
            this._meta[name].content = this._data[name];
          } else {
            var m = document.createElement('meta');
            if (name.substring(0, 3) === 'og:') {
              m.setAttribute('property', name);
            } else {
              m.name = name;
            }
            m.content = this._data[name];
            document.head.appendChild(m);
            this._meta[name] = m;
          }
        }
        // keep track of names of meta we've added
        names.push(name);
      }
    }

    // remove any leftover meta tags that weren't re-used
    for (var name in this._meta) {
      if (this._meta.hasOwnProperty(name) && names.indexOf(name) === -1) {
        document.head.removeChild(this._meta[name]);
        delete this._meta[name];
      }
    }
  }
}

window.customElements.define('app-metadata', AppMetadata);


AppMetadata.instance = null;
AppMetadata.requestAvailability = function() {
  if (!AppMetadata.instance) {
    AppMetadata.instance = document.createElement('app-metadata');
    document.body.appendChild(AppMetadata.instance);
  }
};

export function addMetadataListener() {
    document.addEventListener('app-metadata', OnAppMetadata);
}
function OnAppMetadata(e) {
    updateMetadata(e.detail);
}
export function updateMetadata(data) {
    setMedatadata(Object.assign({}, data, { url: data.url || document.location.href }));
}
function setMedatadata(data) {
    const keysUsed = [];
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = data[key];
        switch (key) {
            case 'title':
                document.title = value;
                break;
            default:
                keysUsed.push(setMetaValue(key, value));
                break;
        }
        switch (key) {
            case 'title':
            case 'description':
            case 'image':
            case 'url':
                keysUsed.push(setMetaValue('og:' + key, value));
                keysUsed.push(setMetaValue('twitter:' + key, value));
                break;
        }
    }
    const keysExisting = Object.keys(metaElements);
    for (let i = 0; i < keysExisting.length; i++) {
        const key = keysExisting[i];
        if (keysUsed.indexOf(key) === -1) {
            document.head.removeChild(metaElements[key]);
            delete metaElements[key];
        }
    }
}
/**
 * Object to keep track of added meta elements so that
 * they can be reused or removed as necessary
 */
const metaElements = {};
function setMetaValue(key, value) {
    const attrName = key.startsWith('og:') ? 'property' : 'name';
    // re-use any already-created meta-tags if possible
    let element = metaElements[key];
    if (!element) {
        // check for existing element (maybe in original server-rendered page)
        const selector = `meta[${attrName}="${key}"]`;
        element = document.head.querySelector(selector);
        if (!element) {
            // otherwise create a new element
            element = document.createElement('meta');
            element.setAttribute(attrName, key);
            document.head.appendChild(element);
        }
        metaElements[key] = element;
    }
    // set the new value
    element.content = value;
    return key;
}
//# sourceMappingURL=index.js.map
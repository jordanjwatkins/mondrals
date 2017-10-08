'use strict';

function domReady(init) {
    document.addEventListener('DOMContentLoaded', init);
}

function find(selector, queryRoot) {
    queryRoot = queryRoot || document;

    return queryRoot.querySelectorAll(selector);
}

function findOne(selector, queryRoot) {
    queryRoot = queryRoot || document;

    return queryRoot.querySelectorAll(selector)[0];
}

function findId(selector) {
    return document.getElementById(selector);
}

function each(items, callback) {
    if (items[0]) {
        [].forEach.call(items, callback);
    } else {
        callback(items);
    }
}

function on(els, event, callback) {
    each(els, function (el) {
        if (el.addEventListener) {
            el.addEventListener(event, callback);
        }
    });
}

function off(els, event, callback) {
    each(els, function (el) {
        if (el.removeEventListener) {
            el.removeEventListener(event, callback);
        }
    });
}

function inArray(value, array) {
    return [].indexOf.call(array, value) > -1;
}

function onTap(els, callback) {
    var touched = false,
        tapCallback = handleTap(callback);

    on(els, 'click', tapCallback);
    on(els, 'touchstart', tapCallback);

    return tapCallback;

    function handleTap() {
        return function (e) {
            // prevent click event event if triggering event was touchstart
            if (e.type === 'touchstart') {
                e.preventDefault();
                touched = true;
            } else if (touched === true) {
                touched = false;
                return false;
            }

            callback(e);
        };
    }
}

function offTap(els, callback) {
    off(els, 'click', callback);
    off(els, 'touchstart', callback);
}

function fragment(htmlString) {
    var aFragment = document.createDocumentFragment();

    if (htmlString) {
        aFragment.innerHTML = htmlString;
    }

    return aFragment;
}

function make(htmlString) {
    var div = document.createElement('div');

    if (htmlString) {
        div.innerHTML = htmlString;
    }

    return div.childNodes[0];
}

function css(els, styles) {
    each(els, applyStyles);

    function applyStyles(el) {
        var property;

        for (property in styles) {
            if (styles.hasOwnProperty(property)) {
                el.style[property] = styles[property];
            }
        }
    }
}

function forOwn(object, callback, thisArg) {
    var key;

    for (key in object) {
        if (object.hasOwnProperty(key)) {
            callback.call(thisArg, object[key], key, object);
        }
    }

    return object;
}

window.dom = {
    ready: domReady,
    find: find,
    findOne: findOne,
    findId: findId,
    each: each,
    on: on,
    off: off,
    inArray: inArray,
    onTap: onTap,
    offTap: offTap,
    fragment: fragment,
    make: make,
    css: css,
    forOwn: forOwn
};

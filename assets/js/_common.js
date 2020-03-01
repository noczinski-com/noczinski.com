function unsafeExecution(execution, onError) {
    try {
        return execution();
    } catch (e) {
        if (window.console && window.console.debug) {
            console.debug('Operation was not successful.', execution, e);
        }
        if (onError) {
            return onError();
        }
    }
}

function forEachElement(elements, callback) {
    for (var i = 0; i < elements.length; i++) {
        callback(elements.item(i));
    }
}

function forEachElementBy(query, callback) {
    forEachElement(document.querySelectorAll(query), callback);
}

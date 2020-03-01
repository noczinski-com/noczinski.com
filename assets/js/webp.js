function supportsWebp(callback) {
    unsafeExecution(function () {
        if (!window.createImageBitmap) {
            callback(false);
            return;
        }
        var data = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=';
        fetch(data).then(function (response) {
            return response.blob();
        }).then(function (blob) {
            // If the createImageBitmap method succeeds, return true, otherwise false
            createImageBitmap(blob).then(function () {
                callback(true);
            }, function () {
                callback(false);
            });
        });
    })
}

supportsWebp(function (supported) {
    unsafeExecution(function() {
        forEachElementBy('body', function(element) {
            element.setAttribute('data-webp-supported', supported);
        });
    })
});

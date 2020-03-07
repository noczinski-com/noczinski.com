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

;
function toggleHamburger(hamburger, state) {
    var active = hamburger.classList.toggle("is-active", state);
    forEachElementBy('header', function(header) {
        header.setAttribute("data-expanded", active);
    });
}

forEachElementBy('.hamburger', function(hamburger) {
    hamburger.addEventListener("click", function () {
        toggleHamburger(hamburger);
    });
});

forEachElementBy('header', function(header) {
    header.addEventListener("focusout", function (e) {
        if (!e || !e.relatedTarget && !header.contains(e.relatedTarget)) {
            forEachElementBy('.hamburger', function(hamburger) {
                toggleHamburger(hamburger, false);
            });
        }
    });
});

;
// noinspection JSUnusedGlobalSymbols
function initGoogleMaps() {
    unsafeExecution(function () {
        forEachElementBy('.google-maps', function (element) {
            var center = new google.maps.LatLng(
                element.getAttribute('data-lat'),
                element.getAttribute('data-lon'),
            );

            var style = [{"featureType": "all", "elementType": "labels.text.fill", "stylers": [{"saturation": 36}, {"color": "#000000"}, {"lightness": 40}]}, {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [{"visibility": "on"}, {"color": "#000000"}, {"lightness": 16}]
            }, {"featureType": "all", "elementType": "labels.icon", "stylers": [{"visibility": "off"}]}, {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#000000"}, {"lightness": 20}]
            }, {"featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{"color": "#000000"}, {"lightness": 17}, {"weight": 1.2}]}, {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{"color": "#000000"}, {"lightness": 20}]
            }, {"featureType": "poi", "elementType": "geometry", "stylers": [{"color": "#000000"}, {"lightness": 21}]}, {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#000000"}, {"lightness": 17}]
            }, {"featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{"color": "#000000"}, {"lightness": 29}, {"weight": 0.2}]}, {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{"color": "#000000"}, {"lightness": 18}]
            }, {"featureType": "road.local", "elementType": "geometry", "stylers": [{"color": "#000000"}, {"lightness": 16}]}, {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [{"color": "#000000"}, {"lightness": 19}]
            }, {"featureType": "water", "elementType": "geometry", "stylers": [{"color": "#000000"}, {"lightness": 17}]}];

            var map = new google.maps.Map(element, {
                center: center,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                backgroundColor: "#000",
                panControl: !1,
                zoomControl: !0,
                mapTypeControl: !1,
                scaleControl: !1,
                streetViewControl: !1,
                overviewMapControl: !1,
                zoomControlOptions: {style: google.maps.ZoomControlStyle.LARGE}
            });

            var mapType = new google.maps.StyledMapType(style, {name: "Grayscale"});
            map.mapTypes.set('grey', mapType);
            map.setMapTypeId('grey');

            var pinIcon = new google.maps.MarkerImage("/icons/marker.png", null, null, null, new google.maps.Size(46, 40));
            var marker = new google.maps.Marker({position: center, map: map, icon: pinIcon, title: element.getAttribute('data-title')})

        });
    })
}

;
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
    });
    if (!supported) {
        forEachElementBy('*', function(element) {
            if (element.style.backgroundImage && typeof element.style.backgroundImage === 'string') {
                element.style.backgroundImage = element.style.backgroundImage.replace(/\.webp(["']\))?$/, '.jpg$1');
            }
        });
    }
});

;
function displayWindowSize() {
    unsafeExecution(function () {
        var windowHeight = document.documentElement.clientHeight;
        var bodyHeight = document.body.clientHeight;
        function setElementHeight(element) {
            if (element.style !== undefined) {
                if (windowHeight > bodyHeight) {
                    element.style.height = '100%';
                } else {
                    element.style.height = 'auto';
                }
            }
        }
        forEachElementBy('html', setElementHeight);
        forEachElementBy('body', setElementHeight);
    })
}

window.addEventListener("resize", displayWindowSize);
displayWindowSize();

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

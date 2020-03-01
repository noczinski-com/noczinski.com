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

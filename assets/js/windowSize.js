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

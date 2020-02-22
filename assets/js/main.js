function displayWindowSize() {
    try {
        let elements = Array.from(document.getElementsByTagName('html'))
            .concat(Array.from(document.getElementsByTagName('body')));
        let windowHeight = document.documentElement.clientHeight;
        let bodyHeight = document.body.clientHeight;
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].style !== undefined) {
                if (windowHeight > bodyHeight) {
                    elements[i].style.height = '100%';
                } else {
                    elements[i].style.height = 'auto';
                }
            }
        }
    } catch (e) {
        if (window.debug) {
            throw e;
        }
    }
}


try {
    window.addEventListener("resize", displayWindowSize);
    window.addEventListener("load", displayWindowSize);
} catch (e) {
    if (window.debug) {
        throw e;
    }
}

const toggleHamburger = state => {
    const active = hamburger.classList.toggle("is-active", state);
    header.setAttribute("data-expanded", active);
};
const hamburger = document.querySelector(".hamburger");
const header = document.querySelector("header");
hamburger.addEventListener("click", () => {
    toggleHamburger();
});
header.addEventListener("focusout", e => {
    if (!header.contains(e.relatedTarget)) {
        toggleHamburger(false);
    }
});

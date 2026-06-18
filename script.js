function checkScroll() {

    const needScroll =
        document.documentElement.scrollHeight >
        window.innerHeight;

    document.body.style.overflowY =
        needScroll ? "auto" : "hidden";

    document.documentElement.style.overflowY =
        needScroll ? "auto" : "hidden";
}

checkScroll();

window.addEventListener("resize", checkScroll);
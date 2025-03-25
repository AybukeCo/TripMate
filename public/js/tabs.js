document.querySelectorAll(".tab-item").forEach(item => {
    const link = item.querySelector("a"); // get the tag 'a'
    const href = link.getAttribute("href"); // get the link

    // add data-page to related nav-item
    if (href.includes("itinerary")) {
        item.setAttribute("data-pages", "itinerary");
        console.log(href);
    } else if (href.includes("finance")) {
        item.setAttribute("data-pages", "finance");
    } else if (href.includes("chat")) {
        item.setAttribute("data-pages", "chat");
    }
    else {
        item.setAttribute("data-pages", href); // other pages will be directly linked to `href`
    }
});
const currentTab = window.location.pathname.split("/").pop(); // get the current page
console.log("Tabs, Current Page:", currentTab);
document.querySelectorAll(".tab-item").forEach(item => {
    const pages = item.getAttribute("data-pages").split(",");
    if (pages.includes(currentTab)) {
        //item.classList.add("active");
        item.children[0]["childNodes"][1].classList.add("active");
    }
})
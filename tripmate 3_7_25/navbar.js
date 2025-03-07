document.querySelectorAll(".nav-item").forEach(item => {
    const link = item.querySelector("a"); // 获取 `<a>` 标签
    const href = link.getAttribute("href"); // 获取链接的 `href`

    // add data-page to related nav-item
    if (href.includes("homepage")) {
        item.setAttribute("data-pages", "homepage.html");
    } else if (href.includes("profile")) {
        item.setAttribute("data-pages", "profile.html");
    } else if (href.includes("chat")) {
        item.setAttribute("data-pages", "chat.html");
    }
    else {
        item.setAttribute("data-pages", href); // other pages will be directly linked to `href`
    }
});
// get the current page
const currentPage = window.location.pathname.split("/").pop(); // 获取当前文件名
console.log("Current Page:", currentPage);
// set corresponding nav-item to active
document.querySelectorAll(".nav-item").forEach(item => {
    const pages = item.getAttribute("data-pages").split(",");
    if (pages.includes(currentPage)) {
        item.classList.add("active");
    }
});
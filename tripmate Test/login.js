// listen to every back-button, once clicked go back to the previous page
function initBackButtons() {
    document.querySelectorAll(".back-btn").forEach(div => {
        div.addEventListener("click", function() {
            // go back to the previous page
            window.history.back();
        });
    });
}

function hideShowPwd() {
    const passwordInput = document.getElementsByName("password");
    const toggleIcon = document.querySelector(".hide-pwd-btn i");

    passwordInput.forEach(input => {
        if (input.type === "password") {
            input.type = "text"; // 变为可见
            toggleIcon.classList.replace("fa-eye-slash", "fa-eye"); // 图标切换
        } else {
            input.type = "password"; // 变为隐藏
            toggleIcon.classList.replace("fa-eye", "fa-eye-slash");
        }
    })

}

function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email); // if valid return true, if invalid return false
}

document.getElementsByName("email").forEach(input => {
    input.addEventListener("change",function (){
        const email = input.value;
        const info = document.querySelector(".email-valid-info");
        if (validateEmail(email)) {
            info.style.display = "none";
        }
        else{
            info.style.display = "block";
        }
    });
})

// automatically execute once the page is loaded
document.addEventListener("DOMContentLoaded", initBackButtons);


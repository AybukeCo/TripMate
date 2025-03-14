function editProfile() {
    // enable all the input fields
    document.querySelectorAll(".profile-input").forEach(input => {
        input.removeAttribute("disabled");
    })
    // todo: verify all the input formats
    // enable the save button for profile changes
    const saveProfileButton = document.getElementById("save-profile-btn");
    saveProfileButton.classList.add("active");
}

function saveProfile() {
    // disable all the input fields
    document.querySelectorAll(".profile-input").forEach(input => {
        input.setAttribute("disabled","true");
    })
    // todo: connect to database
    // disable the save button for profile changes
    const saveProfileButton = document.getElementById("save-profile-btn");
    saveProfileButton.classList.remove("active");
}
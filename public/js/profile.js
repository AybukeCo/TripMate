function editProfile() {
    // enable all the input fields
    document.querySelector("#profile-name").removeAttribute("disabled");
    // document.getElementById("profile-pwd").type = "text";
    // todo: verify all the input formats
    // enable the save button for profile changes
    const saveProfileButton = document.getElementById("save-profile-btn");
    saveProfileButton.classList.add("active");
}

function saveProfile() {
    // disable all the input fields
    document.querySelector("#profile-name").setAttribute("disabled","true");
    // document.getElementById("profile-pwd").type = "password";
    // disable the save button for profile changes
    const saveProfileButton = document.getElementById("save-profile-btn");
    saveProfileButton.classList.remove("active");
    saveProfileButton.submit();
}
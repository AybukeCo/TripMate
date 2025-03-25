function uploadAvatar() {
    console.log("Upload avatar available now.");
    const upload = document.getElementById("avatar-form");
    upload.submit();
}

function editProfile() {
    // enable all the input fields
    const profileName=document.getElementById('profile-name');
    profileName.removeAttribute("disabled");
    profileName.classList.add('active');
    // document.getElementById("profile-pwd").type = "text";
    // todo: verify all the input formats
    // enable the save button for profile changes
    const saveProfileButton = document.getElementById("save-profile-btn");
    saveProfileButton.classList.add("active");

    // profile avatar uploading allowed
    const profileAvatar = document.querySelector(".profile-img");
    profileAvatar.classList.add('upload-avatar');
    profileAvatar.setAttribute("style", "cursor: pointer; background: var(--light-gray);");
    document.querySelector(".profile-text").setAttribute("style","display:block;");
    document.getElementById("profile-avatar").setAttribute("style", "display:none;");
    document.querySelector(".upload-avatar").setAttribute("onclick","uploadAvatar()");
}

function saveProfile() {
    // document.getElementById("profile-pwd").type = "password";
    // disable the save button for profile changes
    const saveProfileButton = document.getElementById("save-profile-btn");
    saveProfileButton.classList.remove("active");
    saveProfileButton.submit();
    // disable all the input fields
    document.querySelector("#profile-name").setAttribute("disabled","true");
    document.querySelector("#profile-name").classList.remove("active");
    document.querySelector(".profile-text").setAttribute("style","display:none;");
}

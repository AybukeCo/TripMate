function uploadAvatar() {
    console.log("Upload avatar available now.");

    // the function of choosing a file is anchored to the new class 'upload-avatar'
    const fileInput = document.getElementById('file-input');
    const fileSubmit = document.getElementById('file-submit');
    fileInput.click();

    // submit the form automatically when there's a change
    fileInput.addEventListener('change', function(){
        if (fileInput.files && fileInput.files.length > 0) {
            fileSubmit.click();
        }
    })
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
    saveProfileButton.removeAttribute("disabled");

    // profile avatar uploading allowed
    const profileAvatar = document.querySelector(".profile-img");
    profileAvatar.classList.add('upload-avatar');
    profileAvatar.setAttribute("style", "cursor: pointer; background: var(--light-gray);");

    document.getElementById("profile-avatar").setAttribute("style", "display:none;");
    document.querySelector(".upload-avatar").setAttribute("onclick","uploadAvatar()");
}

function saveProfile() {
    // document.getElementById("profile-pwd").type = "password";

    // disable the save button for profile changes
    const saveProfileButton = document.getElementById("save-profile-btn");
    saveProfileButton.classList.remove("active");

    // submit the change of the form before being disabled
    saveProfileButton.submit();
    saveProfileButton.setAttribute("disabled", "true");

    // submit the avatar change at the same time
    // const upload = document.getElementById("avatar-form");
    // upload.submit();

    // disable all the input fields
    document.querySelector("#profile-name").setAttribute("disabled","true");
    document.querySelector("#profile-name").classList.remove("active");
    document.querySelector(".profile-text").setAttribute("style","display:none;");
}

//================
// Showing the text if hover over user icon
//================
document.addEventListener('DOMContentLoaded', function() {
    const profileImg = document.querySelector('.profile-img');
    const profileText = document.querySelector('.profile-text');
    
    // Show profile-text on hover
    profileImg.addEventListener('mouseover', function() {
        profileText.style.display = 'block';
    });

    // Hide profile-text when hover ends
    profileImg.addEventListener('mouseleave', function() {
        profileText.style.display = 'none';
    });
});

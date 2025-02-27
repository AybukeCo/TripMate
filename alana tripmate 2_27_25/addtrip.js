    // Function to toggle the menu visibility
function toggleMenu() {
    var menu = document.getElementById('add-trip-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// Function to toggle the dropdown visibility
function toggleDropdown() {
    const dropdown = document.getElementById("dropdown-content");
    const button = document.querySelector(".dropbtn");

    // Toggle dropdown visibility
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
        button.classList.remove("active"); // Remove active class
    } else {
        dropdown.style.display = "block";
        button.classList.add("active"); // Add active class
    }
}

// Function to add a participant to the list
function addParticipant(name) {
    // Create a new list item
    var li = document.createElement('li');
    li.textContent = name;

    // Create the remove button for each participant
    var removeBtn = document.createElement('button');
    removeBtn.textContent = "X";  // Add X to the button
    removeBtn.classList.add('remove-btn');
    removeBtn.onclick = function() {
        removeParticipant(li);
        // Add the participant back to the dropdown after removal
        addBackToDropdown(name);
    };

    // Append the remove button to the list item
    li.appendChild(removeBtn);

    // Append the new list item to the participant list
    document.getElementById('participant-list').appendChild(li);

    // Close the dropdown after selecting a participant
    toggleDropdown();

    // Remove the selected participant from the dropdown
    removeFromDropdown(name);
}

// Function to remove a participant from the list
function removeParticipant(listItem) {
    listItem.remove(); // Remove the participant from the list
}

// Function to remove a participant from the dropdown
function removeFromDropdown(name) {
    var dropdownLinks = document.querySelectorAll('.dropdown-content a');
    dropdownLinks.forEach(function(link) {
        if (link.textContent === name) {
            link.style.display = 'none';  // Hide the selected participant from the dropdown
        }
    });
}

// Function to add a participant back to the dropdown after they are removed
function addBackToDropdown(name) {
    var dropdownContent = document.getElementById('dropdown-content');
    var link = document.createElement('a');
    link.href = '#';
    link.textContent = name;
    link.onclick = function() {
        addParticipant(name);
    };
    dropdownContent.appendChild(link);
}

//Show photo

function previewPhoto(event) {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
        const reader = new FileReader(); // Create a FileReader to read the image
        reader.onload = function(e) {
            const previewContainer = document.getElementById("photo-preview");
            previewContainer.innerHTML = `<img src="${e.target.result}" alt="Cover Photo">`;
        };
        reader.readAsDataURL(file); // Convert the image file to a data URL
    }
}

//Adding trips to the page

// Function to close the menu and create a new trip box
function closeMenu() {
    var menu = document.getElementById('add-trip-menu');
    menu.style.display = 'none';

    // Get the trip name and photo preview
    var tripName = document.getElementById('trip-name').value;
    var photoPreview = document.getElementById('photo-preview').querySelector('img');

    // Validate input
    if (tripName && photoPreview) {
        createTripBox(tripName, photoPreview.src);

        // Hide the 'no-trip' message after the first trip is created
        var noTripMessage = document.getElementById('no-trip');
        if (noTripMessage) {
            noTripMessage.style.display = 'none'; // Hides the no-trip message
        }

        // Show the trip container (`.show-box`)
        document.querySelector('.show-box').style.display = 'block';
    } else {
        alert("Please enter a trip name and upload a cover photo.");
    }

    // Clear the input fields and photo preview
    document.getElementById('trip-name').value = '';
    document.getElementById('photo-preview').innerHTML = '';

    // Reset the participant list and dropdown
    resetParticipants();
}

// Function to reset participants
function resetParticipants() {
    var participantList = document.getElementById('participant-list');
    participantList.innerHTML = ''; // Clear the participant list

    var dropdownLinks = document.querySelectorAll('.dropdown-content a');
    dropdownLinks.forEach(function(link) {
        link.style.display = 'block';  // Show all participants again in the dropdown
    });
}

// Function to create a new trip box
// Function to create a new trip box
function createTripBox(name, photoSrc) {
    var tripContainer = document.getElementById('trip-container');

    // Create a new div for the trip box
    var tripBox = document.createElement('div');
    tripBox.classList.add('trip-box');
    tripBox.onclick = function() {
        window.location.href = 'itinerary.html';
    };

    // Add the trip name as a heading
    var tripHeading = document.createElement('h4');
    tripHeading.textContent = name;
    tripBox.appendChild(tripHeading);

    // Add the cover photo
    var tripImage = document.createElement('img');
    tripImage.src = photoSrc;
    tripBox.appendChild(tripImage);

    // Append the new trip box to the container
    tripContainer.appendChild(tripBox);
}



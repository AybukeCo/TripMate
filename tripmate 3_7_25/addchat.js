document.addEventListener("DOMContentLoaded", function () {
    const participants = ["Alice", "Bob", "Charlie", "David", "Eve"];
    const participantList = document.getElementById("participant-list");
    const chatParticipantsList = document.querySelector(".chat-participants-list");
    const chatMenu = document.getElementById("add-trip-menu");
    const showGroupchatName = document.querySelector(".show-groupchat-name");
    const chatContainer = document.getElementById("chat-container");

    if (!participantList) {
        console.error("Participant list element not found!");
        return;
    }

    // Clear existing items to avoid duplication
    participantList.innerHTML = "";
    participantList.style.listStyleType = "none"; // Remove bullet points

    const selectedParticipants = new Set();
    let groupNameInput = null;

    participants.forEach(name => {
        const listItem = document.createElement("li");
        listItem.classList.add("participant-item");
        
        // Create profile icon
        const profileIcon = document.createElement("img");
        profileIcon.src = "icons/profile_icon.png"; // Replace with actual image path
        profileIcon.alt = "Profile Icon";
        profileIcon.classList.add("profile-icon");
        
        // Create name span
        const nameSpan = document.createElement("span");
        nameSpan.textContent = name;
        
        // Append elements
        listItem.appendChild(profileIcon);
        listItem.appendChild(nameSpan);
        
        // Toggle selection on click
        listItem.addEventListener("click", function () {
            if (selectedParticipants.has(name)) {
                selectedParticipants.delete(name);
                this.classList.remove("selected");
            } else {
                selectedParticipants.add(name);
                this.classList.add("selected");
            }
            
            handleGroupNameInput();
        });

        participantList.appendChild(listItem);
    });

    function handleGroupNameInput() {
        if (selectedParticipants.size > 1) {
            if (!groupNameInput) {
                groupNameInput = document.createElement("input");
                groupNameInput.type = "text";
                groupNameInput.placeholder = "Enter group name";
                groupNameInput.classList.add("group-name-input");
                showGroupchatName.appendChild(groupNameInput); // Append inside show-groupchat-name div
            }
        } else {
            if (groupNameInput) {
                groupNameInput.remove();
                groupNameInput = null;
            }
        }
    }

    // Function to check if the chat already exists
    function isChatExists(chatName) {
        const existingChats = document.querySelectorAll(".chat-box h4");
        return Array.from(existingChats).some(chat => chat.textContent === chatName);
    }

    // Create chat function
    document.querySelector(".closebtn-chat").addEventListener("click", function() {
        if (selectedParticipants.size === 0) {
            alert("Please select at least one participant!");
            return;
        }

        let chatName = "";
        let iconSrc = "";  // Variable for chat icon
        if (selectedParticipants.size === 1) {
            // If one participant is selected, use their name and their icon
            chatName = [...selectedParticipants][0];
            iconSrc = "icons/profile_icon.png"; // Replace with actual profile icon source
        } else {
            // If more than one participant is selected, use group name and a placeholder icon
            chatName = groupNameInput ? groupNameInput.value || "Group Chat" : "Group Chat";
            iconSrc = "icons/group_icon.png"; // Placeholder icon for group chats
        }

        // Check if a chat with the same name already exists
        if (isChatExists(chatName)) {
            alert("A chat with this name already exists!");
            return;
        }

        // Create the chat box in the chat container
        const chatBox = document.createElement("div");
        chatBox.classList.add("chat-box");

        // Add the icon and chat name to the chat box
        chatBox.innerHTML = `
            <div class="chat-box-content" onclick="window.location.href='chatting.html';">
                <img src="${iconSrc}" alt="Chat Icon" class="chat-icon">
                <h4>${chatName}</h4>
            </div>
            <div class="chat-content">
                <!-- Chat messages will appear here -->
            </div>
        `;

        // Append the new chat box to the container
        chatContainer.appendChild(chatBox);

        // Clear the selections but keep the participant list intact
        selectedParticipants.clear();
        groupNameInput && groupNameInput.remove();
        groupNameInput = null;
        // Don't clear the participant list, only reset the selections
        const allParticipantItems = document.querySelectorAll(".participant-item");
        allParticipantItems.forEach(item => {
            item.classList.remove("selected");
        });

        // Close the menu after creating the chat
        toggleMenu();
    });
});

function toggleMenu() {
    var menu = document.getElementById('add-trip-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

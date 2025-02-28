document.addEventListener("DOMContentLoaded", function () {
  // Go back button functionality
  document.querySelector(".go-back-page").addEventListener("click", function() {
      window.location.href = "chat.html";
  });

  // Message sending functionality
  const messageBox = document.getElementById("chatting-box");
  const sendButton = document.querySelector(".send-message");
  const messageContainer = document.querySelector(".show-message");

  sendButton.addEventListener("click", function () {
      sendMessage('sent');
  });

  // Allow sending with "Enter" key
  messageBox.addEventListener("keypress", function(event) {
      if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault(); // Prevent newline in textarea
          sendMessage('sent');
      }
  });

  function sendMessage(type) {
      const messageText = messageBox.value.trim();
      if (messageText === "") return; // Do nothing if empty

      // Create a new message element
      const messageElement = document.createElement("div");
      messageElement.classList.add("message");
      messageElement.classList.add(type); // Adds 'sent' or 'received'

      // Customize the message text for received vs sent
      messageElement.textContent = messageText;

      // Append the message to the container
      messageContainer.appendChild(messageElement);

      // Clear the input box
      messageBox.value = "";

      // Auto-scroll to the latest message
      messageContainer.scrollTop = messageContainer.scrollHeight;
  }
});

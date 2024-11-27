const socket = new WebSocket("ws://localhost:8080");

//Elements
const Div = document.getElementById("chat");
const inputUsername = document.getElementById("username");
const inputMessage = document.getElementById("message");
const sendButton = document.getElementById("button");

//Print
const print = (username, message) => {
  const newMessage = document.createElement("div");
  newMessage.textContent = `${username}: ${message}`;
  Div.appendChild(newMessage);
  Div.scrollTop = Div.scrollHeight;
};

socket.onmessage = (event) => {
  const reader = new FileReader();

  reader.onload = () => {
    try {
      const { username, message } = JSON.parse(reader.result);
      print(username, message);
    } catch (error) {
      console.error("Failed to parse message:", error);
    }
  };

  reader.readAsText(event.data);
};

socket.onerror = (error) => {
  console.error("WebSocket error:", error);
};

// Send a message
sendButton.addEventListener("click", () => {
  const username = inputUsername.value.trim();
  const message = inputMessage.value.trim();

  if (!username) {
    alert("Please enter a username.");
    return;
  }

  if (!message) {
    alert("Please enter a message.");
    return;
  }

  const data = JSON.stringify({ username, message });
  socket.send(data);
  inputMessage.value = "";
});

inputMessage.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    sendButton.click();
  }
});

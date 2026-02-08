class PathlyticsChat {
  constructor() {
    // CHANGE this when you deploy (your Flask base URL)
    this.apiBaseUrl = "http://127.0.0.1:5000";
    this.initElements();
    this.initEvents();
    this.updateStatus("Connected. Ask your question.");
  }

  initElements() {
    this.chatToggle = document.getElementById("chatToggle");
    this.chatContainer = document.getElementById("chatContainer");
    this.closeChatBtn = document.getElementById("closeChat");
    this.chatMessages = document.getElementById("chatMessages");
    this.messageInput = document.getElementById("messageInput");
    this.sendButton = document.getElementById("sendButton");
    this.chatStatus = document.getElementById("chatStatus");
    this.endChatButton = document.getElementById("endChatButton"); // NEW
  }

  initEvents() {
    this.chatToggle.addEventListener("click", () => {
      this.chatContainer.classList.toggle("open");
      this.messageInput.focus();
    });

    this.closeChatBtn.addEventListener("click", () => {
      this.chatContainer.classList.remove("open");
    });

    this.sendButton.addEventListener("click", () => this.handleSend());
    this.messageInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.handleSend();
    });

    // NEW: End Chat button logic
    if (this.endChatButton) {
      this.endChatButton.addEventListener("click", () => this.handleEndChat());
    }
  }

  updateStatus(text) {
    this.chatStatus.textContent = text;
  }

  addMessage(sender, content) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.classList.add(sender === "bot" ? "bot-message" : "user-message");

    const bubble = document.createElement("div");
    bubble.classList.add("message-content");

    if (sender === "bot") {
      bubble.innerHTML = `<strong>Pathlytics Bot:</strong> ${content}`;
    } else {
      bubble.innerHTML = `<strong>You:</strong> ${content}`;
    }

    messageDiv.appendChild(bubble);
    this.chatMessages.appendChild(messageDiv);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }

  async handleSend() {
    const text = this.messageInput.value.trim();
    if (!text) return;

    this.addMessage("user", text);
    this.messageInput.value = "";
    this.sendButton.disabled = true;
    this.updateStatus("Pathlytics Bot is typing...");

    try {
      const response = await fetch(`${this.apiBaseUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      const botReply = data.reply || "Sorry, I did not understand that.";

      this.addMessage("bot", botReply);
      this.updateStatus("Connected. Ask your next question.");
    } catch (err) {
      console.error(err);
      this.addMessage("bot", "Sorry, there was a problem connecting to the server.");
      this.updateStatus("Error connecting to backend.");
    } finally {
      this.sendButton.disabled = false;
      this.messageInput.focus();
    }
  }

  // NEW: End Chat handler
  handleEndChat() {
    // Clear all messages
    this.chatMessages.innerHTML = "";

    // Add fresh greeting
    this.addMessage(
      "bot",
      "Chat ended. Refresh the page or open the chat again to start a new conversation."
    );

    // Optionally close the chat after a short delay
    setTimeout(() => {
      this.chatContainer.classList.remove("open");
    }, 800);

    this.updateStatus("Chat ended.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new PathlyticsChat();
});

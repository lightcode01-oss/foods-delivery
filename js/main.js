/* ========== Navigation =========== */
const hamburger = document.querySelector(".hamburger");
const close = document.querySelector(".nav-list .close");
const menu = document.querySelector(".nav-list");

hamburger.addEventListener("click", () => {
  menu.classList.add("show");
});

close.addEventListener("click", () => {
  menu.classList.remove("show");
});

/* ========== SignIn Form =========== */
const signInForm = document.querySelector("header .wrapper");

document.querySelector(".signin").onclick = () => {
  signInForm.classList.add("active");
};

document.querySelector(".close-form").onclick = () => {
  signInForm.classList.remove("active");
};

/*========== Local AI Bot Functionality without API ==========*/

document.addEventListener('DOMContentLoaded', () => {
  const aiBotButton = document.getElementById('aiBotButton');
  const aiBotChatWindow = document.getElementById('aiBotChatWindow');
  const aiBotCloseButton = document.getElementById('aiBotCloseButton');
  const aiBotForm = document.getElementById('aiBotForm');
  const aiBotInput = document.getElementById('aiBotInput');
  const aiBotMessages = document.getElementById('aiBotMessages');

  const cartButton = document.getElementById('cartButton');

  // Add click event to cart button to navigate to cart page
  cartButton.addEventListener('click', () => {
    window.location.href = 'cart.html';
  });

  // Initialize cart count display on home page
  const cartCountElement = document.getElementById('cartCount');
  if (cartCountElement) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCountElement.textContent = cart.length;
  }

  // Predefined chatbot conversation flow
  const services = {
    "1": {
      name: "Order Status",
      response: "Please provide your order ID to check the status."
    },
    "2": {
      name: "Menu Inquiry",
      response: "You can browse our menu on the Food page. Do you want to see popular items or new arrivals? (Type 'popular' or 'new')"
    },
    "3": {
      name: "Payment Issues",
      response: " type 'payment' for common payment problems or You can also connect to our agent by a 'call'."
    },
    "4": {
      name: "Delivery Issues",
      response: " type 'delivery' for common delivery problems or You can also connect to our agent by a 'call'."
    },
    "5": {
      name: "Want a Call",
      response: "Please select a time slot for the call or type 'menu' to return to the main menu."
    }
  };

  const timeSlots = {
    "1": { name: "9 AM - 10 AM" },
    "2": { name: "10 AM - 11 AM" },
    "3": { name: "11 AM - 12 PM" },
    "4": { name: "2 PM - 3 PM" },
    "5": { name: "3 PM - 4 PM" }
  };

  // Function to append message to chat window
  function appendMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('ai-bot-message', sender);
    messageDiv.textContent = message;
    aiBotMessages.appendChild(messageDiv);
    aiBotMessages.scrollTop = aiBotMessages.scrollHeight;
  }

  // Function to append buttons for options
  function appendOptions(options) {
    const optionsDiv = document.createElement('div');
    optionsDiv.classList.add('ai-bot-options');
    for (const key in options) {
      const button = document.createElement('button');
      button.classList.add('ai-bot-option-button');
      button.textContent = options[key].name;
      button.dataset.key = key;
      button.addEventListener('click', () => {
        appendMessage(options[key].name, 'user');
        handleUserInput(key);
        optionsDiv.remove();
      });
      optionsDiv.appendChild(button);
    }
    aiBotMessages.appendChild(optionsDiv);
    aiBotMessages.scrollTop = aiBotMessages.scrollHeight;
  }

  // Function to show initial greeting and options
  function showGreeting() {
    appendMessage("Hey myself ABHIHUB FOOD DELIVERY SITE, I'm here for your 24*7 hours support.", 'bot');
    appendOptions(services);
  }

  // Function to handle user input and provide responses
  function handleUserInput(input) {
    input = input.toLowerCase().trim();

    // If input is a number and matches a service
    if (services[input]) {
      if (input === "5") {
        // Show time slot options for "Want a Call"
        appendMessage(services[input].response, 'bot');
        appendOptions(timeSlots);
        lastService = input;
        lastTimeSlotSelection = false;
        return;
      } else {
        appendMessage(services[input].response, 'bot');
        appendMessage("Thank you for your query. You can exit by typing 'exit'.", 'bot');
        appendOptions(services);
        lastService = input;
        return;
      }
    }

    // Handle time slot selection after "Want a Call"
    if (lastService === "5" && timeSlots[input]) {
      appendMessage(`You have selected the time slot: ${timeSlots[input].name}. We will call you then. Thank you!`, 'bot');
      appendMessage("Type 'menu' to return to the main menu or 'exit' to end chat.", 'bot');
      lastService = null;
      lastTimeSlotSelection = true;
      return;
    }

    // Handle want a call command
    // Handle specific follow-up inputs for Menu Inquiry
    if (input === 'popular') {
      appendMessage("Our popular items are: Crispy Fried Chicken, French Fries, and Ice Cream.", 'bot');
      appendMessage("Is there anything else I can help you with? Select a service or type 'exit' to end chat.", 'bot');
      appendOptions(services);
      return;
    }
    if (input === 'new') {
      appendMessage("Our new arrivals include: Spicy Pizza, Vegan Burger, and Chocolate Cake.", 'bot');
      appendMessage("Is there anything else I can help you with? Select a service or type 'exit' to end chat.", 'bot');
      appendOptions(services);
      return;
    }

    // Handle return to menu command
    if (input === 'menu') {
      appendMessage("Returning to the main menu. Please select a service.", 'bot');
      appendOptions(services);
      lastService = null;
      return;
    }

    // Handle return to paymrnt command
    if (input === 'payment') {
      appendMessage("Enter your transaction ID or order ID.", 'bot');
      appendMessage("Is there anything else I can help you with? Select a service or type 'exit' to end chat.", 'bot');
      appendOptions(services);
      return;
    }

    //Handle return to delivery command
    if (input === 'delivery') {
      appendMessage("Enter your order ID.", 'bot');
      appendMessage("Is there anything else I can help you with? Select a service or type 'exit' to end chat.", 'bot');
      appendOptions(services);
      return;
    }

    // Handle exit command
    if (input === 'exit' || input === 'bye' || input === 'quit') {
      appendMessage("Thank you for contacting ABHIHUB FOOD DELIVERY SITE. Have a great day!", 'bot');
      aiBotChatWindow.classList.remove('active');
      return;
    }

    // Default response for unrecognized input
    appendMessage("Sorry, I didn't understand that. Please select a service or type 'exit' to end chat.", 'bot');
    appendOptions(services);
  }

  let lastService = null;

  // Toggle chat window visibility and show greeting on open
  aiBotButton.addEventListener('click', () => {
    aiBotChatWindow.classList.toggle('active');
    if (aiBotChatWindow.classList.contains('active')) {
      aiBotMessages.innerHTML = ''; // Clear previous messages
      showGreeting();
      aiBotInput.focus();
      lastService = null;
    }
  });

  // Close chat window
  aiBotCloseButton.addEventListener('click', () => {
    aiBotChatWindow.classList.remove('active');
  });

  // Handle form submit for user input
  aiBotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userMessage = aiBotInput.value.trim();
    if (!userMessage) return;
    appendMessage(userMessage, 'user');
    aiBotInput.value = '';

    // Process user input
    handleUserInput(userMessage);
  });

  // Voice command functionality
  const voiceInputButton = document.getElementById('voiceInputButton');
  let recognition;
  let recognizing = false;

  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      recognizing = true;
      voiceInputButton.innerHTML = '<i class="bx bx-microphone-off"></i>';
      voiceInputButton.title = 'Stop voice input';
      voiceInputButton.setAttribute('aria-label', 'Stop voice input');
    };

    recognition.onend = () => {
      recognizing = false;
      voiceInputButton.innerHTML = '<i class="bx bx-microphone"></i>';
      voiceInputButton.title = 'Start voice input';
      voiceInputButton.setAttribute('aria-label', 'Start voice input');
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      recognizing = false;
      voiceInputButton.innerHTML = '<i class="bx bx-microphone"></i>';
      voiceInputButton.title = 'Start voice input';
      voiceInputButton.setAttribute('aria-label', 'Start voice input');
    };

    recognition.onresult = (event) => {
      let transcript = event.results[0][0].transcript;
      // Remove all trailing full stops and trim trailing spaces
      transcript = transcript.replace(/[.]+$/g, '').trim();
      aiBotInput.value = transcript;
      // Optionally auto-submit the form after voice input
      aiBotForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    };

    voiceInputButton.addEventListener('click', () => {
      if (recognizing) {
        recognition.stop();
        recognizing = false;
      } else {
        recognition.start();
      }
    });
  } else {
    // Browser does not support SpeechRecognition
    voiceInputButton.style.display = 'none';
  }
});

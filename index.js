require("dotenv").config(); // Load environment variables from .env

const tmi = require("tmi.js");
const { OpenAI } = require("openai");

// OpenAI Configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Ensure BOT_PERSONALITY is loaded correctly
const botPersonality = process.env.BOT_PERSONALITY; // Load as a single line

if (!botPersonality) {
  console.error("Error: BOT_PERSONALITY is not defined or is empty in the .env file.");
  process.exit(1); // Exit if BOT_PERSONALITY is not defined
}

console.log("Loaded BOT_PERSONALITY:", botPersonality); // Log the loaded personality for debugging

// Conversation history storage
const conversationHistory = new Map();
const MAX_HISTORY = 10;

// Get user's conversation history
const getUserHistory = (username) => {
  if (!conversationHistory.has(username)) {
    conversationHistory.set(username, []);
  }
  return conversationHistory.get(username);
};

// Add a message to the conversation history
const addToHistory = (username, role, content) => {
  const history = getUserHistory(username);
  history.push({ role, content });
  if (history.length > MAX_HISTORY) history.splice(0, history.length - MAX_HISTORY);
};

// Twitch Client Configuration
const client = new tmi.Client({
  options: { debug: true },
  connection: { secure: true, reconnect: true },
  identity: {
    username: "g4zb0t",
    password: process.env.TWITCH_OAUTH_TOKEN,
  },
  channels: process.env.TWITCH_CHANNELS.split(","), // Load channels from .env
});
client.connect();

// Handle Twitch messages
client.on("message", async (channel, tags, message, self) => {
  if (self) return;

  const username = tags.username;
  console.log(`Message from ${tags["display-name"]}: ${message}`);

  if (message.toLowerCase().includes("!example")) {
    setTimeout(() => {
      client.say(
        channel,
        "You can create your own commands using this example, e.g. change this text and the command !example to be whatever you want."
      );
    }, 3000);
    return;
  }

  if (message.toLowerCase().startsWith("!gazbot ")) {
    const userInput = message.slice(8).trim();
    try {
      console.log("Sending request to OpenAI API with model: gpt-4");

      const history = getUserHistory(username);
      const messages = [
        {
          role: "system",
          content: botPersonality, // Use the correctly loaded bot personality
        },
        ...history,
        { role: "user", content: userInput },
      ];

      console.log("Messages sent to OpenAI API:", messages); // Log the messages for debugging

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages,
        temperature: 0.7,
      });

      const response = completion.choices[0].message.content;
      console.log("Response from OpenAI API:", response); // Log the response for debugging

      addToHistory(username, "user", userInput);
      addToHistory(username, "assistant", response);

      setTimeout(() => client.say(channel, response), 3000);
    } catch (error) {
      console.error("Error with OpenAI API:", error);
      const errorMessage =
        error.response?.data?.error?.message || error.message || "Unknown error";
      client.say(channel, `Error: ${errorMessage}`);
    }
    return;
  }

  if (message.toLowerCase() === "!clearhistory") {
    conversationHistory.set(username, []);
    client.say(channel, `@${tags["display-name"]} I've cleared our conversation history.`);
  }
});
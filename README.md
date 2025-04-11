# Twitch AI Bot (aka GazBot)

This bot is designed to interact with Twitch chat and OpenAI's GPT-4 API. Follow the steps below to set it up and run it.

---

## Prerequisites

1. **Install Node.js**  
   - Download and install Node.js from [https://nodejs.org/](https://nodejs.org/).  
   - Choose the **LTS (Long Term Support)** version for stability.  
   - After installation, verify it by opening a terminal/command prompt and running:
     ```
     node -v
     npm -v
     ```

2. **Create a Twitch Account**  
   - If you don't already have a Twitch account, create one at [https://www.twitch.tv/](https://www.twitch.tv/).

3. **Generate a Twitch OAuth Token**  
   - Visit [https://twitchtokengenerator.com/](https://twitchtokengenerator.com/) to generate an OAuth token for your Twitch account. Choose Bot Chat Token. Once you authorise you will find your "ACCESS TOKEN" on the page. 
   - **Important:** Do not share your OAuth token with anyone or show it on stream. Treat it like a password, it grants access to your twitch account. If it gets exposed, regenerate it immediately.

4. **Get an OpenAI API Key**  
   - Sign up or log in to OpenAI at [https://platform.openai.com/](https://platform.openai.com/).  
   - Navigate to the API section and generate an API key.  
   - **Important:** Do not share your API key with anyone. If it gets exposed, revoke it and generate a new one.

---

## Setup Instructions

1. **Download the Bot Code**  
   - Download or clone this repository to your computer.

2. **Install Dependencies**  
   - Open a terminal/command prompt in the folder where the bot's files are located.  
   - Run the following command to install the required dependencies:
     ```
     npm install tmi.js openai
     ```

3. **Configure Environment Variables**  
   - Open the `.env` file in the bot's folder.  
   - Replace the placeholder values with your Twitch OAuth token and OpenAI API key:
     ```
     # Twitch Configuration
     TWITCH_OAUTH_TOKEN=your_twitch_oauth_token_here

     # OpenAI Configuration
     OPENAI_API_KEY=your_openai_api_key_here
     ```

4. **Start the Bot**  
   - In the terminal/command prompt, run:
     ```
     node index.js
     ```
   - The bot will connect to Twitch and start listening for chat messages.

---

## Usage

- **Commands**  
  - `!example`: Displays an example command response.  
  - `!gazbot <message>`: Sends your message to the bot for a response.  
  - `!clearhistory`: Clears your conversation history with the bot.

- **Customization**  
  - You can modify the bot's behavior by editing the `index.js` file.

---

## Troubleshooting

- **Node.js Not Found**  
  - Ensure Node.js is installed and added to your system's PATH.  
  - Restart your terminal/command prompt after installation.

- **Error with OpenAI API**  
  - Double-check your OpenAI API key in the `.env` file.  
  - Ensure your OpenAI account has sufficient credits.

- **Twitch Connection Issues**  
  - Verify your Twitch OAuth token in the `.env` file.  
  - Ensure the bot's Twitch account is not banned or restricted.

---

Enjoy using the bot! If you encounter any issues, feel free to reach out for help.

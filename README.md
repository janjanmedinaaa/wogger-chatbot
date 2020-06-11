# Messenger Chatbot Boilerplate
This project was created to help developers in creating their own Messenger Chatbot by using pre-built functions for sending different types of Messages.

## Requirements:
- Facebook Page
- Facebook Developer Account

## Usage
1. Get your `Messenger Access Token` from the Facebook Developer Console and add it to your `.env` file.
2. Create your `Messenger Verify Token` that will in verifying your Messenger Webhook and add it to your `.env` file.
3. Install tunnelling software like `NGROK` or `Localtunnel` for Development purposes so you won't keep verifying your Webhook on the Facebook Developer Console.
4. Start the Boilerplate by running the `npm start` command.
5. Run your Tunnelling Software using the Port provided in your `.env` file.
6. Set the URL given by your Tunnelling Software as a Messenger Webhook on the Facebook Developer Console. Use the Verify Token that you used from **Step 2**.
7. Test the Messenger Chatbot by sending it a message. You should be able to receive the same message.

## Tips
1. For Development, using Tunnelling tools like `NGROK` would be really helpful since you can easily debug your Chatbot from your Local Server.
2. For Small Project Chatbots that doesn't plan on handling millions of users at the same time, deployment services like [Vercel](https://vercel.com) could help you publish your Chatbot for free.
3. When handling Long Processing like Image Processing, we recommend running it on a seperate service to avoid unexpected timeouts. For my project, [MemeServe Chatbot](https://github.com/janjanmedinaaa/memeserve-chatbot), I have used Github Actions to handle my Image Processing and also replying the User as well.
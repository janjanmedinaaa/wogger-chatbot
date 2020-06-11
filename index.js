const express = require('express');
const bodyParser = require('body-parser');
const Messenger = require('./utils/messenger');
require('dotenv').config();

const SenderAction = require('./utils/messenger').SenderAction;

const app = express().use(bodyParser.json());
const PORT = process.env.PORT;

// Receive messages from Messenger
app.post('/', async(req, res) => {
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(async function(entry) {

      // Only get the first Message received
      let messages = entry.messaging[0];

      // Get User Id and Message
      let senderUserId = messages.sender.id;

      let messageToReply1 = 'Here is your Wogger key:'
      let messageToReply2 = 'Add this key to your Project to receive Messages from your Development Logs.'
      let messageToReply3 = 'Have fun Debugging!'

      // Acknowledge Messages received by notifying the user that
      // you have seen the message and adding a typing indicator if 
      // you're planning to reply
      await Messenger.sendAction(senderUserId, SenderAction.MARK_SEEN);
      await Messenger.sendAction(senderUserId, SenderAction.TYPING_ON);

      // For now, this returns the received message to the user
      // Await is necessary here since Vercel doesn't process data anymore
      // after sending the response to the user
      await Messenger.sendMessage(senderUserId, `${messageToReply1} ${senderUserId}`);
      await Messenger.sendAction(senderUserId, SenderAction.TYPING_ON);
      await Messenger.sendMessage(senderUserId, messageToReply2);
      await Messenger.sendAction(senderUserId, SenderAction.TYPING_ON);
      await Messenger.sendMessage(senderUserId, messageToReply3);

      return res.status(200).send('EVENT_RECEIVED');
    });
  } else {
    return res.sendStatus(403);
  }
});

// Receive verification challenge from Facebook
app.get('/', (req, res) => {
  let VERIFY_TOKEN = process.env.MESSENGER_VERIFY_TOKEN
    
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  } else {
    return res.sendStatus(200);
  }
});

app.listen(PORT, () => {
  console.log('Messenger Chatbot Server Started');
});
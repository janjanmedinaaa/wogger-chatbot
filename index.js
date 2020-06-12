const express = require('express');
const bodyParser = require('body-parser');
const Messenger = require('./utils/messenger');
const { 
  QuickReplies, 
  Repositories,
  GetStartedMessages,
  HowToUseMessages,
  WoggerKeyMessage,
  DefaultMessage,
  Payload
} = require('./utils/constants');

require('./utils/mapAsync');
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
      let message = messages.message;
      let postback = messages.postback;

      // Acknowledge Messages received by notifying the user that
      // you have seen the message and adding a typing indicator if
      // you're planning to reply
      await Messenger.sendAction(senderUserId, SenderAction.MARK_SEEN);
      await Messenger.sendAction(senderUserId, SenderAction.TYPING_ON);

      if (message != undefined) {

        // Handle Quick Replies
        if (message.quick_reply != undefined) {
          switch (message.quick_reply.payload) {
            case Payload.GET_WOGGER_KEY:
              await Messenger.sendMessage(
                senderUserId, 
                `${WoggerKeyMessage} ${senderUserId}`,
                QuickReplies
              );
              break;

            case Payload.CHECK_SOURCE_CODE:
              await Messenger.sendUrl(senderUserId, Repositories);
              break;

            case Payload.HOW_TO_USE:
              await HowToUseMessages.mapAsync(async (message, index, size) => {
                if (index != size - 1) {
                  await Messenger.sendMessage(senderUserId, message);
                  await Messenger.sendAction(senderUserId, SenderAction.TYPING_ON);
                } else {
                  await Messenger.sendMessage(senderUserId, message, QuickReplies);
                }
              });
              break;
          }

          await Messenger.sendAction(senderUserId, SenderAction.TYPING_OFF);
          return res.status(200).send('EVENT_RECEIVED');
        } 
        
        await Messenger.sendMessage(
          senderUserId, 
          DefaultMessage,
          QuickReplies
        );
      } else if (postback != undefined) {

        // Handle any Postback Messages
        await Messenger.sendMessage(senderUserId, `${WoggerKeyMessage} ${senderUserId}`);
        await GetStartedMessages.mapAsync(async (message, index, size) => {
          if (index != size - 1) {
            await Messenger.sendMessage(senderUserId, message);
            await Messenger.sendAction(senderUserId, SenderAction.TYPING_ON);
          } else {
            await Messenger.sendMessage(senderUserId, message, QuickReplies);
          }
        });
      }

      await Messenger.sendAction(senderUserId, SenderAction.TYPING_OFF);
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
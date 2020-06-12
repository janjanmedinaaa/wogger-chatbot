const fetch = require('node-fetch');
require('dotenv').config();

const BASE_URL = 'https://graph.facebook.com/v7.0/me/messages';
const ACCESS_TOKEN = process.env.MESSENGER_ACCESS_TOKEN;

const MESSAGE_URL = `${BASE_URL}?access_token=${ACCESS_TOKEN}`;

const SenderAction = {
  MARK_SEEN: 'mark_seen',
  TYPING_ON: 'typing_on',
  TYPING_OFF: 'typing_off'
}

const MessageAttachment = {
  AUDIO: 'audio',
  VIDEO: 'video',
  IMAGE: 'image',
  FILE: 'file',
  TEMPLATE: 'template'
}

const sendToMessenger = (body) => {
  return fetch(MESSAGE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
  .then(res => res.json())
}

const sendMessage = (id, text, quickReplies) => {
  let body = {
    recipient: { id },
    message: { text }
  }

  if (quickReplies != undefined) {
    var replies = []

    Object.keys(quickReplies).forEach(reply => {
      replies.push({
        content_type: 'text',
        title: reply,
        payload: quickReplies[reply]
      })
    });

    body.message['quick_replies'] = replies
  }

  return sendToMessenger(body)
}

const sendAction = (id, action) => {
  let body = {
    recipient: { id },
    sender_action: action
  }

  return sendToMessenger(body)
}

const sendAttachment = (id, type, url) => {
  let body = {
    recipient: { id },
    message: {
      attachment: {
        type, 
        payload: {
          url, 
          is_reusable: true
        }
      }
    }
  }

  return sendToMessenger(body)
}

const sendUrl = (id, items) => {
  let body = {
    recipient: { id },
    message: {
      attachment: {
        type: 'template', 
        payload: {
          template_type: 'generic', 
          elements: items.map(item => {
            item['buttons'] = [
              {
                type: 'web_url',
                title: 'Visit Website',
                url: item.url
              }
            ];

            delete item.url;
            return item;
          })
        }
      }
    }
  }

  return sendToMessenger(body)
}

module.exports = {
  sendMessage,
  sendAction,
  sendAttachment,
  sendUrl,

  SenderAction,
  MessageAttachment
}
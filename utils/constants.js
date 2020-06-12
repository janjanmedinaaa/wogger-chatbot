const Repositories = [
  {
    title: 'Wogger Chatbot',
    subtitle: 'Wogger Messenger Chatbot receives Development Logs from your Project.',
    image_url: 'https://avatars1.githubusercontent.com/u/30612273?s=460&u=31f11d43a04611cd32178fa975f876f4318d4e82&v=4',
    url: 'https://github.com/janjanmedinaaa/wogger-chatbot'
  },
  {
    title: 'Wogger Logs for Android',
    subtitle: 'A Development Logger that sends notifications via Messenger Chatbot, SMS, or even a custom Webhook.',
    image_url: 'https://avatars1.githubusercontent.com/u/30612273?s=460&u=31f11d43a04611cd32178fa975f876f4318d4e82&v=4',
    url: 'https://github.com/janjanmedinaaa/wogger-logs'
  },
  {
    title: 'Wogger Sender API',
    subtitle: 'Wogger Sender API that sends Logs to users via Messenger Chatbot or SMS.',
    image_url: 'https://avatars1.githubusercontent.com/u/30612273?s=460&u=31f11d43a04611cd32178fa975f876f4318d4e82&v=4',
    url: 'https://github.com/janjanmedinaaa/wogger-sender'
  }
];

const Payload = {
  GET_WOGGER_KEY: 'GET_WOGGER_KEY',
  CHECK_SOURCE_CODE: 'CHECK_SOURCE_CODE',
  HOW_TO_USE: 'HOW_TO_USE'
}

const QuickReplies = {
  'Get Wogger Key': Payload.GET_WOGGER_KEY,
  'Check Source Code': Payload.CHECK_SOURCE_CODE,
  'How to Use': Payload.HOW_TO_USE
}

const WoggerKeyMessage = 'Here is your Wogger key:'

const DefaultMessage = 'Here are some functionalities that you can use:'

const GetStartedMessages = [
  'Add this key to your Project to receive Messages from your Development Logs.',
  'Have fun Debugging!'
]

const HowToUseMessages = [
  'Wogger Logs is a Development tool that will help you debug issues remotely through Webhooks.',
  'To use Wogger, you need to install Wogger Logs on your Project.',
  'Then add your Wogger Key to your Project and you\'re done!',
  'Have fun Debugging!'
]

module.exports = {
  WoggerKeyMessage,
  DefaultMessage,
  GetStartedMessages,
  HowToUseMessages,

  Repositories,
  QuickReplies,

  Payload
}
  
'use strict';


const line = require('@line/bot-sdk');
const express = require('express');

require('dotenv').config()

console.log(process.env.CHANNEL_ACCESS_TOKEN)
console.log(process.env.CHANNEL_SECRET)
console.log(process.env.PORT)

// create LINE SDK config from env variables
const config = {
  channelId: '1557825870',
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  var messagebody = ''
  var userId = event.source.userId
  var userName = event.source.profile.displayName

  switch(event.message.text.toLowerCase()) 
  {
	  case 'help':
		messagebody  = 'how can i help you!, id:' + userId + ', Name:' + userName
		break;
	  case 'submit':
		messagebody  = 'what do you want submit case'
		break;
	  default:
		messagebody  = event.message.text
	  
	  
  }
  // create a echoing text message
  const echo = { type: 'text', text: 'only echo ' + messagebody };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
/*
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
*/

var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
  });

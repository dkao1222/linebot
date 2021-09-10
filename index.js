const line = require('@line/bot-sdk');
const express = require('express');

const handleEvent = require('./linehandleEvent.js')

require('dotenv').config()

console.log('CHANNEL_ACCESS_TOKEN:' + process.env.CHANNEL_ACCESS_TOKEN)
console.log('CHANNEL_SECRET:' + process.env.CHANNEL_SECRET)
console.log('PORT:' + process.env.PORT)

// create LINE SDK config from env variables
const config = {
    //channelId: '1557825870',
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);

const app = express();

app.post('/callback', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent.handleEvent))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});





var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});



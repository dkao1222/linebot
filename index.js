const line = require('@line/bot-sdk');
const express = require('express');

const { getData } = require('./googleSheet.js');
const { getRowCount } = require('./googleSheet.js');
const { AddRow } = require('./googleSheet.js');

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
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        // ignore non-text-message event
        return Promise.resolve(null);
    }
    console.log(`使用者 ID: ${event.source.userId}`);

    client.getProfile(event.source.userId)
        .then((profile) => {
            console.log(profile.userId);
            console.log(profile.displayName);
            console.log(profile.pictureUrl);
            console.log(profile.statusMessage);


        })
        .catch((err) => {
            // error handling
        });

    (async () => {

        const resp = await getRowCount('1lRu68z-02-W8uuVE4nOEMaZpjsi6ghBo6xobHZkQLiY', '1363045017');
        client.getProfile(event.source.userId)
        .then((profile) => {
            console.log(profile.userId);
            console.log(profile.displayName);
            console.log(profile.pictureUrl);
            console.log(profile.statusMessage);
            console.log('add Row')
            (async () => {
                await AddRow('1lRu68z-02-W8uuVE4nOEMaZpjsi6ghBo6xobHZkQLiY', '1363045017', profile.userId, profile.displayName, profile.pictureUrl,profile.statusMessage,'','','')
            })
             
            
        })
        .catch((err) => {
            // error handling
        });

        console.log(resp);
    })();

    client.getProfile(event.source.userId)
        .then((profile) => {
            console.log(profile.userId);
            console.log(profile.displayName);
            console.log(profile.pictureUrl);
            console.log(profile.statusMessage);
            

            
        })
        .catch((err) => {
            // error handling
        });



    // create a echoing text message
    const echo = { type: 'text', text: event.message.text };

    // use reply API
    return client.replyMessage(event.replyToken, echo);
}



var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});



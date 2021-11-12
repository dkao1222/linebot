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



    var userData = []
    client.getProfile(event.source.userId)
        .then((profile) => {
            //console.log(profile.userId);
            //console.log(profile.displayName);
            //console.log(profile.pictureUrl);
            //console.log(profile.statusMessage);
            userData.push(profile.userId)
            userData.push(profile.displayName)
            userData.push(profile.pictureUrl)
            userData.push(profile.statusMessage)

        })
        .catch((err) => {
            // error handling
        });
    (async function() {
        //await someAsyncFunction();
        const resp = await getData('1lRu68z-02-W8uuVE4nOEMaZpjsi6ghBo6xobHZkQLiY', '1363045017');
        console.log(resp);

        console.log('length :'+resp.length)
        console.log('indexof:' + resp.indexOf(userData[0]))
        
        //return resp

    }());

    var userChecktext = userCheck(userData[0]).then(function(result) {
        /*
        for (let index = 0; index <= result.length; index++) {
            console.log('check')
            if( result[index][0] == userData[0] ) {
                console.log(result[index][6])
                return result[index][6]
                break
            }else {
                console.log('No Match User')
                return 'No Match User'
            };
            
        }
        */
        
    })
    
    console.log('usercheck:'+ userChecktext)



    /*
     const resp = await getData('1lRu68z-02-W8uuVE4nOEMaZpjsi6ghBo6xobHZkQLiY', '1363045017');
     const readuserId = resp.map(function (userId, Name1) {
         if (userId = profile.userId) {
             const echo = { type: 'text', text: resp.get('您好 ' + Name1) };
         } else {
             const addData = AddRow('1lRu68z-02-W8uuVE4nOEMaZpjsi6ghBo6xobHZkQLiY', '1363045017', profile.userId, profile.displayName, profile.pictureUrl, profile.statusMessage)
             console.log(addData);
 
             const echo = { type: 'text', text: 'Please submit your question' };
 
         }
 
     })
     */
     
    
    //const echo = { type: 'text', text: event.message.text };
    // create a echoing text message
    const echo = { type: 'text', text: event.message.text + ' ' + userChecktext };

    // use reply API
    return client.replyMessage(event.replyToken, echo);
}

var userCheck = async function (values) {
    
        const resp = await getData('1lRu68z-02-W8uuVE4nOEMaZpjsi6ghBo6xobHZkQLiY', '1363045017');
        console.log(resp);

        console.log('length :'+resp.length)
        console.log('indexof:' + resp.indexOf(values))
        return resp

    
    //resp
    
    /*
    
    var msgText = ""
        for (let index = 0; index <= resp.length; index++) {
            if( resp[index][0] = values ) {
                console.log(resp[index][6])
                msgText = resp[index][6]
                break
            }else {
                console.log('No Match User')
                msgText = 'No Match User'
            };
            
        }

    return msgText   
    */
    
    
    /*
    Promise
    .resolve(
        resp.map(function (userId, displayName, pictureUrl, statusMessage, vendor, name1, name2) {
            if (userId == values) {
                console.log('map user')
                return 'user map'
            } else {
                console.log('no match')
                return 'user nomatch'
            }
        })
    )
    */
}

var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});



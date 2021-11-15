const line = require('@line/bot-sdk');
const { json } = require('express');
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

// user headcount 
//1lRu68z-02-W8uuVE4nOEMaZpjsi6ghBo6xobHZkQLiY , Sheet id: 1363045017

// Shipping Google sheet
//1CvnH-tfd17tWP71fSBzPxeiQXvTw6M4_pHyY97p_rxc , Sheet id : 486683186


function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        // ignore non-text-message event
        return Promise.resolve(null);
    }
    console.log(`使用者 ID: ${event.source.userId}`);

    

    //var userData = []
    var userChecktext = client.getProfile(event.source.userId)
        .then((profile) => {
            console.log(profile.userId);
            //console.log(profile.displayName);
            //console.log(profile.pictureUrl);
            //console.log(profile.statusMessage);
            //userData.push(profile.userId)
            //userData.push(profile.displayName)
            //userData.push(profile.pictureUrl)
            //userData.push(profile.statusMessage)
            return userCheck(profile)


        })
        .catch((err) => {
            // error handling
        });


    //console.log('User Data :' + userData)

    /*
    var userChecktext = userCheck(userData[0]).then(function(result) {
        
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
        
        
    })
    */
    //console.log('usercheck:'+ userChecktext)



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

     /*
    switch (event.message.text.toLowerCase()) {
        case 'help':
            messagebody = 'Hi, ' + currectUserName + ', how can i help you!'
            //messagebody  = 'how can i help you! id:' + client.getProfile(event.source.userId).then((profile)=>{ profile.displayName})
            break;
        case 'submit':
            messagebody = 'what do you want submit case'

            break;
        default:
            messagebody = event.message.text


    }
    */
    //getShipping()
    //const echo = { type: 'text', text: event.message.text };
    // create a echoing text message
    const result = userChecktext.then(function (result) {
        //console.log(result)
        //event.message.text + ' ' +
        const echo = { type: 'text', text: result };
        //return result
        return client.replyMessage(event.replyToken, echo);

        

    })
    //const echo = { type: 'text', text: event.message.text + ' ' + Promise.resolve(userChecktext)};

    // use reply API
    //return client.replyMessage(event.replyToken, echo);
}

async function getShipping() {
    const resp = await getData('1CvnH-tfd17tWP71fSBzPxeiQXvTw6M4_pHyY97p_rxc', '1363045017');
    console.log(resp);
}

async function userCheck(profile) {
    //const addData = AddRow('1lRu68z-02-W8uuVE4nOEMaZpjsi6ghBo6xobHZkQLiY', '1363045017', profile.userId, profile.displayName, profile.pictureUrl, profile.statusMessage)

    const resp = await getData('1lRu68z-02-W8uuVE4nOEMaZpjsi6ghBo6xobHZkQLiY', '1363045017');
    console.log(resp);

    //console.log('length :'+resp.length)
    //console.log('indexof:' + resp.indexOf(values))
    //return resp
    var msgText = ""
    //console.log(resp)
    try {
        for (let index = 0; index < resp.length; index++) {

            if (resp[index][0] == profile.userId) {
                console.log(resp[index][5])

                if (resp[index].length < 5) {
                    msgText = '您好 id:[' + profile.displayName + '],有什麼我可以為您服務的'
                } else {
                    switch(resp[index][4].toLowerCase()) {
                        case 'administrator':
                            msgText = '您好 ['+ resp[index][4] +'],[' + profile.displayName + '],有什麼我可以為您服務的'
                            break
                        case 'shipping':
                            msgText = '您好 ['+ resp[index][4] +'],[' + profile.displayName + '],有什麼我可以為您服務的'
                            break
                        case 'receiving':
                            msgText = '您好 ['+ resp[index][4] +'],[' + profile.displayName + '],有什麼我可以為您服務的'
                            break
                        case 'reverse':
                            msgText = '您好 ['+ resp[index][4] +'],[' + profile.displayName + '],有什麼我可以為您服務的'
                            break
                        case 'is':
                            msgText = '您好 ['+ resp[index][4] +'],[' + profile.displayName + '],有什麼我可以為您服務的'
                            break
                        default:
                        msgText = '您好 ['+ resp[index][4] +'],[' + profile.displayName + '],有什麼我可以為您服務的'
                    } 
                    
                }

                break
            } else {
                console.log('No Match User')
                msgText = '您好 id:[' + profile.displayName + '],有什麼我可以為您服務的'
                const addData = AddRow('1lRu68z-02-W8uuVE4nOEMaZpjsi6ghBo6xobHZkQLiY', '1363045017', profile.userId, profile.displayName, profile.pictureUrl, profile.statusMessage)


            };
        }
    } catch (err) {
        console.log(err)
    }



    console.log('message:' + msgText)
    return msgText

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



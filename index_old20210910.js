
'use strict';


const line = require('@line/bot-sdk');
const express = require('express');
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');


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


// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

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


var userControllerArray = []

// Load client secrets from a local file.
fs.readFile('client_secret.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), UserControllerRead);
});


// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  var messagebody = ''

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



  //var userId = event.source.userId
  //var userName = event.source.profile.displayName
  client.getProfile(event.source.userId)
    .then((profile) => {
      var currectUserName = ""
      userControllerArray.map((row) => {
        console.log('check uid' + row[0]);

        if (event.source.userId == row[0]) {
          currectUserName = row[3] + ',Group: ' + row[6]
          fs.readFile('client_secret.json', (err, content) => {
            if (err) return console.log('Error loading client secret file:', err);
            // Authorize a client with credentials, then call the Google Sheets API.
            authorize(JSON.parse(content), UserControllerWrite);
          });

        }
        else {
          currectUserName = profile.displayName
          //authorize(JSON.parse(content),UserControllerWrite);
        }

      })




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

      const echo = { type: 'text', text: 'only echo ' + messagebody };
      return client.replyMessage(event.replyToken, echo);

    });

}

// listen on port
/*
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
*/

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

/*
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), listMajors);
});
*/
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1uk0cCVy6dgGh5dU2kRBmC6no2K2Rdu7ChXCrvPLRdt0/edit?usp=sharing
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function UserControllerRead(auth) {
  const sheets = google.sheets({ version: 'v4', auth });
  sheets.spreadsheets.values.get({
    spreadsheetId: '1uk0cCVy6dgGh5dU2kRBmC6no2K2Rdu7ChXCrvPLRdt0',
    range: 'UserController!A2:H',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      console.log('Name, Major:');
      // Print columns A and E, which correspond to indices 0 and 4.
      rows.map((row) => {
        console.log(`${row[0]}, ${row[4]}`);
        var tempArray = []
        tempArray.push(row[0]) // uid
        tempArray.push(row[1]) // profile display name
        tempArray.push(row[2]) // cn name
        tempArray.push(row[3]) // en name
        tempArray.push(row[4]) // user Team
        tempArray.push(row[5]) // user job
        tempArray.push(row[6]) // usser Control account
        tempArray.push(row[7]) // user SAP id

        userControllerArray.push(tempArray)
      });
    } else {
      console.log('No data found.');
    }
  });
}

function UserControllerWrite(auth) {
  const sheets = google.sheets({ version: 'v4', auth });
  let values = [
    [
      'test'
    ],
    // Additional rows ...
  ];
  const resoure = {
    values
  }

  this.sheetsService.spreadsheets.values.update({
    spreadsheetId: '1uk0cCVy6dgGh5dU2kRBmC6no2K2Rdu7ChXCrvPLRdt0',
    range: 'UserController!A4',
    valueInputOption,
    resource,
  }, (err, result) => {
    if (err) {
      // Handle error
      console.log(err);
    } else {
      console.log('%d cells updated.', result.updatedCells);
    }
  });
}
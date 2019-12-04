var linebot = require('linebot');
var express = require('express');
const { google } = require('googleapis');
var OAuth2 = google.auth.OAuth2;

// UPS LOGO : https://lh3.googleusercontent.com/Ild2nbhqVTXlkO1X2-ZlDUTAyBD4l36vBQg7vlAStsJEjReyE08oaaqxDSvtzGeU9TZ10yQlp9GXx8WhdRwIGUdTbnqRpF6auRaUsmmGKzJAmgj7nck2Z3ottVaDl3htX1-DNWTTNPLT1tLfI3qVrwd3xylee3JA5e_Ejg-mDSoN6thDaoMWzecdweYcf-S5nNIWOLVwZ0084VZhy4dkajnwzZtyVX05JCqjRFmhfwqRQQRizVRBHGLLvhKCETgohXnO2Jb-EeAKUvY6QfwWJjfPvZwsEn1NONvlJjQBj5RmLywhm6SWRxS2DnygOEGunGojrLv_DGORDTkIBzkhk3tysGFiPjDNc0aS5CBb2uBRLSr746dYd52_V6lSSZYAjFzsdzB0xXSEoRaciEdKnZ_eD92kW2C8YAOo6Kj7o_heXZl9kt3xTX3zSFxxOZrwbchzTM-aD-76PaO6yxZMoL5TzLo5wnTbfKC1eJYI7F091BevLRLO1Lx6v6aUtauSq8IbAVEwILkOmRCkG9HnMdztS0ks8EYxLTHnUeO7j1XooLnDre-G2Kxur5FI3gt1fylO0sTZJjtfEvEmLYs1sE2qLqD_QTLxiGy6wX6cVhQXZQsu8S4DzfcDwrm3YZKlK3gIGWxhG-KGh9dHIKC9QXXch1WwlT3uSVAInfJJm96S7w=w720-h869-no

//底下輸入client_secret.json檔案的內容
var myClientSecret = { "installed": { "client_id": "1051796365777-fskrjtdchqet6kdhqaceibmg3gk2qlbk.apps.googleusercontent.com", "project_id": "quickstart-1553970594242", "auth_uri": "https://accounts.google.com/o/oauth2/auth", "token_uri": "https://oauth2.googleapis.com/token", "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs", "client_secret": "-TSECTqGxl47cPyf1s9330Ti", "redirect_uris": ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"] } }


var CLIENT_ID = '1051796365777-fskrjtdchqet6kdhqaceibmg3gk2qlbk.apps.googleusercontent.com',
  CLIENT_SECRET = '-TSECTqGxl47cPyf1s9330Ti',
  REDIRECT_URL = 'urn:ietf:wg:oauth:2.0:oob',
  SCOPE = ['https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/plus.me',
    'https://spreadsheets.google.com/feeds/',
  ];

//const auth = new googleAuth();
//var oauth2Client = new auth.OAuth2(myClientSecret.installed.client_id,myClientSecret.installed.client_secret, myClientSecret.installed.redirect_uris[0]);
var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
//底下輸入sheetsapi.json檔案的內容
oauth2Client.credentials = {"access_token":"ya29.Il-zB4BOYpF5hnOakybJzgFj5gboPPJq5XbgV_AriW-214bpSdouTwGkG9I33FdmL4dDQyE_qrVLfktyIEeDbt3zvpBsQPS8m-jxHh5USvVX7ekZbwbHS_B-d-uGdOUZ1w","refresh_token":"1//0eyrv894AlxGACgYIARAAGA4SNwF-L9IrzzBMeVxtYe68UXaXWWefQ-rO668wmeR_olT58kF9mzbRyOG1xHYiJCq26XCMCPXjpPo","scope":"https://www.googleapis.com/auth/spreadsheets","token_type":"Bearer","expiry_date":1575399622502}



//試算表的ID，引號不能刪掉
var mySheetId = '1f4BtCOli7vyxHdeAQtDn6Zx6KqFYkVA1G9ghf-s0Lcs';

var myQuestions = [];
var users = [];
var totalSteps = 0;
var myReplies = [];


var bot = linebot({
  channelId: '1557825870',
  channelSecret: '8e9c4b83759ee2cdadb89c8e986f6ef7',
  channelAccessToken: 'V1a8PUXW1SskDXF+YnUm5ybLN8GTH0rK84XttZK6bcQw1czB6Ej+8K/vUN8ESCIS6IeApUAzX+rHrt+vBW6zJX5s0nymrCv4QnO9QTSJhsGmzsHKgVF2JMSZ1WUzMC16RL3Vd1OFII1C/+JKxvC0bQdB04t89/1O/w1cDnyilFU='
});

//程式啟動後會去讀取試算表內的問題
//getQuestions();

listMajors(oauth2Client)
//getTrelloInformation('receiving')
//這一段的程式是專門處理當有人傳送文字訊息給LineBot時，我們的處理回應
bot.on('message', function (event) {

  // var myId=event.source.userId;
  if (event.message.type = 'text') {
    var msg = event.message.text.toLowerCase()
    switch (msg) {
      case 'help':
        //event.reply('如果有任何電腦硬體相關問題請洽 TSG')
        //event.reply('大南路，機場，南工蒼可分機直播 #595 洽 HelpDesk')
        event.reply(_buttonReply2actonViewHelp('HELP for SmartView', '如果有任何電腦硬體相關問題請洽 TSG', 'SmartView', 'Development Request'))
        //QuestionForGoogle(event)
        console.log(msg)
        break;
      case 'smartview':
        event.reply(_buttonReply2actonViewDetail('HELP', 'Submit issue Request', 'No', 'https://forms.gle/rv57VkU6W71Jkyda6'))
        console.log(msg)
        break;
      case 'development request':
        event.reply(_buttonReply2actonViewDetail('HELP', 'Submit dev Request', 'No', 'https://forms.gle/5TzxoyfP5MstGdp37'))
        console.log(msg)
        break;
      case 'receiving_process':
        console.log('receiving')
        getTrelloInformation('receiving', event);
        break;
      case 'shipping_process':
        console.log('shipping_process')
        getTrelloInformation('shipping', event);
        break;
      case 'is_process':
        console.log('is')
        getTrelloInformation('is', event);
        break;
      case 'arpc_process':
        console.log('arpc')
        getTrelloInformation('arpc', event);
        break;
      case 'report_process':
        console.log('reportprocess')
        getTrelloInformation('reportprocess', event);
        break;

    }
  }

  if (event.message.type === 'text') {
    var myId=event.source.userId;
    if (users[myId]==undefined){
       users[myId]=[];
       users[myId].userId=myId;
       users[myId].step=-1;
       users[myId].replies=[];
    }
    var myStep=users[myId].step;
    if (myStep===-1)
       sendMessage(event,myQuestions[0][0]);
    else{
       if (myStep==(totalSteps-1))
          sendMessage(event,myQuestions[1][myStep]);
       else
          sendMessage(event,myQuestions[1][myStep]+'\n'+myQuestions[0][myStep+1]);
       users[myId].replies[myStep+1]=event.message.text;
    }
    myStep++;
    users[myId].step=myStep;
    if (myStep>=totalSteps){
       myStep=-1;
       users[myId].step=myStep;
       users[myId].replies[0]=new Date();
       appendMyRow(myId);
    }
 }

  if (event.message.type = 'text') {
    var msg = event.message.text.toLowerCase();

    event.source.profile().then(function (profile) {
      if (profile.displayName == undefined) {
        return event.reply([{
          type: 'text',
          text: '請將我加入好友，我才會認識你喔 ' //+ event.source.userId
        },
        {
          type: 'text',
          text: 'https://lin.ee/aZPMld'
        },
        {
          type: 'text',
          text: '歡迎 使用 ~~~~ :p , 請輸入 「Help」 獲得進一步資訊' //+ event.source.userId
        },
        {
          type: 'sticker',
          packageId: '1',
          stickerId: '106'
        }
        ])
      }

    }).catch(function (error) {
      console.log(error)// error
    });


  }


});

function QuestionForGoogle(event) {
     var myId=event.source.userId;
     if (users[myId]==undefined){
        users[myId]=[];
        users[myId].userId=myId;
        users[myId].step=-1;
        users[myId].replies=[];
     }
     var myStep=users[myId].step;
     if (myStep===-1)
        sendMessage(event,myQuestions[0][0]);
     else{
        if (myStep==(totalSteps-1))
           sendMessage(event,myQuestions[1][myStep]);
        else
           sendMessage(event,myQuestions[1][myStep]+'\n'+myQuestions[0][myStep+1]);
        users[myId].replies[myStep+1]=event.message.text;
     }
     myStep++;
     users[myId].step=myStep;
     if (myStep>=totalSteps){
        myStep=-1;
        users[myId].step=myStep;
        users[myId].replies[0]=new Date();
        appendMyRow(myId);
     }
}



bot.on('follow', function (event) {
  event.reply('follow: ' + event.source.userId);
});

bot.on('unfollow', function (event) {
  event.reply('unfollow: ' + event.source.userId);
});

bot.on('join', function (event) {
  event.reply('join: ' + event.source.groupId);
});

bot.on('leave', function (event) {
  event.reply('leave: ' + event.source.groupId);
});

bot.on('postback', function (event) {
  event.reply('postback: ' + event.postback.data);
});

bot.on('beacon', function (event) {
  event.reply('beacon: ' + event.beacon.hwid);
});



function _buttonReply2actonViewHelp(buttonTitle, buttonText, answerA, answerB) {
  data = {
    type: 'template',
    altText: 'this is a buttons template',
    template: {
      type: 'buttons',
      thumbnailImageUrl: 'https://4.bp.blogspot.com/-b1T3D00w6KY/WahOihTytWI/AAAAAAAABP8/nqdx7uJxs1YaNqS0BK4m4ZeoK8wjjkA0ACLcBGAs/s320/LOGO_L.jpg',
      title: buttonTitle,
      text: buttonText,
      actions: [
        {
          type: 'message',
          label: answerA,
          text: answerA
        },
        {
          type: 'message',
          label: answerB,
          text: answerB
        }
      ]

    }
  }

  return data
}
function _buttonReply2actonViewDetail(buttonTitle, buttonText, answerA, uri) {
  data = {
    type: 'template',
    altText: 'this is a buttons template',
    template: {
      type: 'buttons',
      thumbnailImageUrl: 'https://4.bp.blogspot.com/-b1T3D00w6KY/WahOihTytWI/AAAAAAAABP8/nqdx7uJxs1YaNqS0BK4m4ZeoK8wjjkA0ACLcBGAs/s320/LOGO_L.jpg',
      title: buttonTitle,
      text: buttonText,
      actions: [
        {
          type: 'message',
          label: answerA,
          text: answerA
        },
        {
          type: 'uri',
          label: 'Start',
          uri: uri
        }
      ]

    }
  }

  return data
}

function sendMessage(eve, msg) {
  eve.reply(msg).then(function (data) {
    // success 
    return true;
  }).catch(function (error) {
    // error 
    return false;
  });
}

function getTrelloInformation(team, event) {

  switch (team) {
    case 'receiving':
      var cardId = '5ddff5f73ac17534a4028e4b'
      break;
    case 'shipping':
      var cardId = '5ddff5fb3fc4563ececc449f'
      break;
    case 'is':
      var cardId = '5ddff6cbc61fb87db3959d62'
      break;
    case 'reportprocess':
      var cardId = '5ddff6964193cc8d932555be'
      break;
    case 'arpc':
      var cardId = '5ddff6ce30fe405387aa626f'
      break;
  }
  /*
    switch (status) {
      case 'completed':
        var urlvalue= 'https://api.trello.com/1/lists/'+cardId
        break
      case 'noncompleted':
        var urlvalue= 'https://api.trello.com/1/lists/'+cardId
        break
    }
  */

  var urlvalue = 'https://api.trello.com/1/lists/' + cardId + '/cards';

  var request = require("request");

  var options = {
    method: 'GET',
    url: urlvalue,
    qs: { key: '243122f21c50d09e6a049ca9edc703a8', token: '79708f45da90bf69714cf3df17225d25ab0add4c99e480e700d1027d9206fa54' }
  };
  var returnValue = [];
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    //return body
    //console.log(body);
    var returnValue = []
    var result = JSON.parse(body);
    console.log('body:'+result)
    if(result.length > 0) {
      //console.log(result);
      result.forEach(e => {
        //console.log('Name:'+e.name);
        //console.log('desc:'+e.desc);


        if (e.dueComplete == false) {
          var status = '❰ todo ❱'
        } else {
          var status = '❰ done ❱㊕'
        }


        //console.log('status:'+status);
        var value = '【Last Active Date】:' + e.dateLastActivity + '\n' +
          '【Task Default End Date】:' + e.due + '\n' +
          '【Task Status】:' + status +
          '【Task Name】:' + e.name + '\n' +
          '【Task Desctrion】:' + e.desc + '\n'


        returnValue.push(value)
        console.log(value)
        //event.reply(value);



      });
      event.reply(returnValue)
    }
    else{
      var value = 'All Task has done or archive to completed.'
      returnValue.push(value)
      event.reply(returnValue)
    }
    /*
    var replayValue =[];
    for(var i = 0 ; i < returnValue.length ; i++) {
      var replyOption = {
        type:'text',
        text:returnValue[i]
      }

      replayValue.push(replyOption);
    }
    console.log('return value:'+replayValue)
    event.reply(JSON.stringify(replayValue))
    */
  });

  /*var replyOption = [];
  for(var i = 0; i < returnValue.length ; i++) {
    replyOption.push({
      type:'text',
      text:returnValue[i]
    })
  }
  console.log(JSON.stringify(replyOption))*/
  //event.reply(JSON.stringify(replyOption))
  //console.log(returnValue)
  //console.log(returnBody)
  //console.log(returnValue)
  //return returnValue
}



function listMajors(auth) {
  const sheets = google.sheets({ version: 'v4', auth });
  sheets.spreadsheets.values.get({
    spreadsheetId: mySheetId,
    range: '問題!A1:E',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    /*if (rows.length) {
      console.log('Name, Major:');
      // Print columns A and E, which correspond to indices 0 and 4.
      rows.map((row) => {
        console.log(`${row}`);
      });
    } else {
      console.log('No data found.');
    } */
    /*const rows = res.data.values;*/
    console.log(rows.length)
    if (rows.length == 0) {
      console.log('No data found.');
    } else {
      myQuestions = rows;
      totalSteps = myQuestions[0].length;
      console.log('要問的問題已下載完畢！');
      console.log(myQuestions[0])
    }
  });
}
//這是讀取問題的函式
function getQuestions() {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
    auth: oauth2Client,
    spreadsheetId: mySheetId,
    range: encodeURI('問題'),
  }, function (err, response) {
    if (err) {
      console.log('讀取問題檔的API產生問題：' + err);
      return;
    }
    var rows = response.values;
    if (rows.length == 0) {
      console.log('No data found.');
    } else {
      myQuestions = rows;
      totalSteps = myQuestions[0].length;
      console.log('要問的問題已下載完畢！');
    }
  });
}

//這是將取得的資料儲存進試算表的函式
function appendMyRow(userId) {
  var request = {
    auth: oauth2Client,
    spreadsheetId: mySheetId,
    range: '表單回應 1',
    insertDataOption: 'INSERT_ROWS',
    valueInputOption: 'RAW',
    resource: {
      "values": [
        users[userId].replies
      ]
    }
  };
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.append(request, function (err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
  });
}

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log('目前的port是', port);
});
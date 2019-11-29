var linebot = require('linebot');
var express = require('express');
const { google } = require('googleapis');
var googleAuth = require('google-auth-library');

// UPS LOGO : https://lh3.googleusercontent.com/Ild2nbhqVTXlkO1X2-ZlDUTAyBD4l36vBQg7vlAStsJEjReyE08oaaqxDSvtzGeU9TZ10yQlp9GXx8WhdRwIGUdTbnqRpF6auRaUsmmGKzJAmgj7nck2Z3ottVaDl3htX1-DNWTTNPLT1tLfI3qVrwd3xylee3JA5e_Ejg-mDSoN6thDaoMWzecdweYcf-S5nNIWOLVwZ0084VZhy4dkajnwzZtyVX05JCqjRFmhfwqRQQRizVRBHGLLvhKCETgohXnO2Jb-EeAKUvY6QfwWJjfPvZwsEn1NONvlJjQBj5RmLywhm6SWRxS2DnygOEGunGojrLv_DGORDTkIBzkhk3tysGFiPjDNc0aS5CBb2uBRLSr746dYd52_V6lSSZYAjFzsdzB0xXSEoRaciEdKnZ_eD92kW2C8YAOo6Kj7o_heXZl9kt3xTX3zSFxxOZrwbchzTM-aD-76PaO6yxZMoL5TzLo5wnTbfKC1eJYI7F091BevLRLO1Lx6v6aUtauSq8IbAVEwILkOmRCkG9HnMdztS0ks8EYxLTHnUeO7j1XooLnDre-G2Kxur5FI3gt1fylO0sTZJjtfEvEmLYs1sE2qLqD_QTLxiGy6wX6cVhQXZQsu8S4DzfcDwrm3YZKlK3gIGWxhG-KGh9dHIKC9QXXch1WwlT3uSVAInfJJm96S7w=w720-h869-no

//底下輸入client_secret.json檔案的內容
var myClientSecret = { "installed": { "client_id": "1082675181890-cs3japs3c18ql77pkl1ova44mto4u039.apps.googleusercontent.com", "project_id": "websheets", "auth_uri": "https://accounts.google.com/o/oauth2/auth", "token_uri": "https://oauth2.googleapis.com/token", "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs", "client_secret": "Ryd0QOggncfAxWBxaoDoSWnx", "redirect_uris": ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"] } }

var auth = new googleAuth();
var oauth2Client = new auth.OAuth2(myClientSecret.installed.client_id, myClientSecret.installed.client_secret, myClientSecret.installed.redirect_uris[0]);

//底下輸入sheetsapi.json檔案的內容
oauth2Client.credentials = { "access_token": "ya29.GlvZBi3YEIEoBK8sN1CbiuHm2jPF2tOzlxY106mO4i-ZBAAAElka0V8EuZCGRxX-6jH7EjmGkYb8nXXBMeuzL8J7cWhzJodL2og4Zg-n-lVWmZchqwWLsY1RahEz", "refresh_token": "1/KmMexNircCX8G48XNkaUU45iLZwHRuLP9xORzf3OKG4", "scope": "https://www.googleapis.com/auth/spreadsheets", "token_type": "Bearer", "expiry_date": 1553698567792 }

//試算表的ID，引號不能刪掉
var mySheetId = '1IIy631u1x2Nt_lk0m-I0-DgunKBwWlYWtmxnmibTtX0';

var myHAWB = [];
var users = [];
var totalSteps = 0;
var myReplies = [];
var myQuestions = [];


var bot = linebot({
  channelId: '1557825870',
  channelSecret: '8e9c4b83759ee2cdadb89c8e986f6ef7',
  channelAccessToken: 'V1a8PUXW1SskDXF+YnUm5ybLN8GTH0rK84XttZK6bcQw1czB6Ej+8K/vUN8ESCIS6IeApUAzX+rHrt+vBW6zJX5s0nymrCv4QnO9QTSJhsGmzsHKgVF2JMSZ1WUzMC16RL3Vd1OFII1C/+JKxvC0bQdB04t89/1O/w1cDnyilFU='
});
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

        console.log(msg)
        break;
      /*case 'help':
          event.reply(_buttonReply2actonViewHelp('HELP', 'Function','Shipping','Receiving','SmartView'))
          console.log(msg)
          break;*/
      /*case 'shipping':
          event.reply(_buttonReply2actonViewHelp('HELP', 'Shipping : 功能選擇','no function1','no function2'))
          console.log(msg)
          break;
      case 'receiving':
          event.reply(_buttonReply2actonViewHelp('HELP', 'Receiving : 功能選擇','記錄進倉','Other'))
          console.log(msg)
          break;
      case '記錄進倉': 
          event.reply(_buttonReply2actonViewDetail('HELP', '開始記錄進倉？','No','https://forms.gle/MKgLoazaQySyBwAR9'))
          console.log(msg)
          break;*/
      case 'smartview':
        event.reply(_buttonReply2actonViewDetail('HELP', 'Submit issue Request', 'No', 'https://forms.gle/rv57VkU6W71Jkyda6'))
        console.log(msg)
        break;
      case 'development request':
        event.reply(_buttonReply2actonViewDetail('HELP', 'Submit dev Request', 'No', 'https://forms.gle/5TzxoyfP5MstGdp37'))
        console.log(msg)
        break;
      case 'receiving':
          console.log('trello')
          
          console.log('trello')
          break;


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

getTrelloInformation('receiving')

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

function getTrelloInformation(team) {
  var returnValue =[];
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

  var urlvalue= 'https://api.trello.com/1/lists/'+cardId+'/cards';

  var request = require("request");

  var options = {
    method: 'GET',
    url: urlvalue,
    qs: {  key: '243122f21c50d09e6a049ca9edc703a8', token: '8af243b65a6b663fcd0176623d66ef3f24fab19754bf52166a63767c86efde53' }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
    
    var result = JSON.parse(body);
    console.log(result);
    result.forEach(e => {
      console.log('Name:'+e.name);
      console.log('desc:'+e.desc);
      console.log('status:'+e.dueComplete);

      if(e.dueComplete = false){
        var status = 'todo'
      }else{
        var status = 'done'
      }
      var value = '[Task Name]:'+e.name+'\n'+
    '[Task Desctrion]:'+e.desc+'\n'+
    '[Task Status]:'+status
    returnValue.push(value)
    });
  });

  return returnValue;
}

function getHawb() {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
    auth: oauth2Client,
    spreadsheetId: mySheetId,
    range: encodeURI('HAWB'),
  }, function (err, response) {
    if (err) {
      console.log('讀取問題檔的API產生問題：' + err);
      return;
    }
    var rows = response.values;
    if (rows.length == 0) {
      console.log('No data found.');
    } else {
      //console.log(rows)
      myQuestions = rows;
      //console.log(myQuestions)
      totalSteps = myQuestions.length;
      console.log('HAWB 已下載完畢！');
      // checkAnswer();
    }

    timer = setInterval(getHawb, 1800000);
  });
}

function checkHawb(myFilter) {
  var i;
  for (var i = 0; myQuestions.length; i++) {
    var filterHAWB = myQuestions[i].indexOf(myFilter);
    if (filterHAWB >= 0) {
      var type = filterHAWB + 1
      var remark = filterHAWB + 2
      console.log(myQuestions[i][type]);
      console.log(myQuestions[i][remark]);
      break;
    } else {
      console.log('can not find HAWB');
    }

  }
}

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log('目前的port是', port);
});
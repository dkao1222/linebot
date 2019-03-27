var linebot = require('linebot');
var express = require('express');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

// UPS LOGO : https://lh3.googleusercontent.com/Ild2nbhqVTXlkO1X2-ZlDUTAyBD4l36vBQg7vlAStsJEjReyE08oaaqxDSvtzGeU9TZ10yQlp9GXx8WhdRwIGUdTbnqRpF6auRaUsmmGKzJAmgj7nck2Z3ottVaDl3htX1-DNWTTNPLT1tLfI3qVrwd3xylee3JA5e_Ejg-mDSoN6thDaoMWzecdweYcf-S5nNIWOLVwZ0084VZhy4dkajnwzZtyVX05JCqjRFmhfwqRQQRizVRBHGLLvhKCETgohXnO2Jb-EeAKUvY6QfwWJjfPvZwsEn1NONvlJjQBj5RmLywhm6SWRxS2DnygOEGunGojrLv_DGORDTkIBzkhk3tysGFiPjDNc0aS5CBb2uBRLSr746dYd52_V6lSSZYAjFzsdzB0xXSEoRaciEdKnZ_eD92kW2C8YAOo6Kj7o_heXZl9kt3xTX3zSFxxOZrwbchzTM-aD-76PaO6yxZMoL5TzLo5wnTbfKC1eJYI7F091BevLRLO1Lx6v6aUtauSq8IbAVEwILkOmRCkG9HnMdztS0ks8EYxLTHnUeO7j1XooLnDre-G2Kxur5FI3gt1fylO0sTZJjtfEvEmLYs1sE2qLqD_QTLxiGy6wX6cVhQXZQsu8S4DzfcDwrm3YZKlK3gIGWxhG-KGh9dHIKC9QXXch1WwlT3uSVAInfJJm96S7w=w720-h869-no

//底下輸入client_secret.json檔案的內容
var myClientSecret={"installed":{"client_id":"1082675181890-cs3japs3c18ql77pkl1ova44mto4u039.apps.googleusercontent.com","project_id":"websheets","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"Ryd0QOggncfAxWBxaoDoSWnx","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}}

var auth = new googleAuth();
var oauth2Client = new auth.OAuth2(myClientSecret.installed.client_id,myClientSecret.installed.client_secret, myClientSecret.installed.redirect_uris[0]);

//底下輸入sheetsapi.json檔案的內容
oauth2Client.credentials ={"access_token":"ya29.GlvZBi3YEIEoBK8sN1CbiuHm2jPF2tOzlxY106mO4i-ZBAAAElka0V8EuZCGRxX-6jH7EjmGkYb8nXXBMeuzL8J7cWhzJodL2og4Zg-n-lVWmZchqwWLsY1RahEz","refresh_token":"1/KmMexNircCX8G48XNkaUU45iLZwHRuLP9xORzf3OKG4","scope":"https://www.googleapis.com/auth/spreadsheets","token_type":"Bearer","expiry_date":1553698567792}

//試算表的ID，引號不能刪掉
var mySheetId='1IIy631u1x2Nt_lk0m-I0-DgunKBwWlYWtmxnmibTtX0';

var myQuestions=[];
var users=[];
var totalSteps=0;
var myReplies=[];

getQuestions();


//這是讀取問題的函式
function getQuestions() {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
     auth: oauth2Client,
     spreadsheetId: mySheetId,
     range:encodeURI('HAWB'),
  }, function(err, response) {
     if (err) {
        console.log('讀取問題檔的API產生問題：' + err);
        return;
     }
     var rows = response.values;
     if (rows.length == 0) {
        console.log('No data found.');
     } else {
       myQuestions=rows;
       totalSteps=myQuestions[0].length;
       console.log('要問的問題已下載完畢！');
     }
  });
}

var bot = linebot({
  channelId: '1557825870',
  channelSecret: '8e9c4b83759ee2cdadb89c8e986f6ef7',
  channelAccessToken: 'V1a8PUXW1SskDXF+YnUm5ybLN8GTH0rK84XttZK6bcQw1czB6Ej+8K/vUN8ESCIS6IeApUAzX+rHrt+vBW6zJX5s0nymrCv4QnO9QTSJhsGmzsHKgVF2JMSZ1WUzMC16RL3Vd1OFII1C/+JKxvC0bQdB04t89/1O/w1cDnyilFU='
});

//這一段的程式是專門處理當有人傳送文字訊息給LineBot時，我們的處理回應
bot.on('message', function(event) {

    // var myId=event.source.userId;
    if (event.message.type = 'text') {
        var msg = event.message.text.toLowerCase()
        switch (msg){
            case 'help':
                event.reply(_buttonReply2actonViewHelp('HELP', 'Function','Shipping','Receiving'))
                console.log(msg)
                break;
            case 'shipping':
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
                break;
        }
    }

    // if (event.message.type = 'text') {
    //     var msg = event.message.text;
    //收到文字訊息時，直接把收到的訊息傳回去
    //     event.reply(msg).then(function(data) {
    //     // 傳送訊息成功時，可在此寫程式碼 
    //     console.log(msg);
    //     }).catch(function(error) {
    //     // 傳送訊息失敗時，可在此寫程式碼 
    //     console.log('錯誤產生，錯誤碼：'+error);
    //     });
    // }
});

function _buttonReply2actonViewHelp(buttonTitle, buttonText, answerA, answerB){
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
function _buttonReply2actonViewDetail(buttonTitle, buttonText, answerA, uri){
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

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log('目前的port是', port);
});
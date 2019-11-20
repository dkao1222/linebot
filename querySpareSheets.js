//以下的四列require裡的內容，請確認是否已經用npm裝進node.js
var linebot = require('linebot');
var express = require('express');
const {google} = require('googleapis');
var googleAuth = require('google-auth-library');

//以下的引號內請輸入申請LineBot取得的各項資料，逗號及引號都不能刪掉
var bot = linebot({
  channelId: '請輸入LineBot的channelId',
  channelSecret: '請輸入LineBot的channelSecret',
  channelAccessToken: '請輸入LineBot的channelAccessToken'
});

//底下輸入client_secret.json檔案的內容
var myClientSecret={"installed":{"client_id":"1082675181890-cs3japs3c18ql77pkl1ova44mto4u039.apps.googleusercontent.com","project_id":"websheets","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"Ryd0QOggncfAxWBxaoDoSWnx","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}}

var auth = new googleAuth();
var oauth2Client = new auth.OAuth2(myClientSecret.installed.client_id,myClientSecret.installed.client_secret, myClientSecret.installed.redirect_uris[0]);

//底下輸入sheetsapi.json檔案的內容
oauth2Client.credentials ={"access_token":"ya29.GlvZBi3YEIEoBK8sN1CbiuHm2jPF2tOzlxY106mO4i-ZBAAAElka0V8EuZCGRxX-6jH7EjmGkYb8nXXBMeuzL8J7cWhzJodL2og4Zg-n-lVWmZchqwWLsY1RahEz","refresh_token":"1/KmMexNircCX8G48XNkaUU45iLZwHRuLP9xORzf3OKG4","scope":"https://www.googleapis.com/auth/spreadsheets","token_type":"Bearer","expiry_date":1553698567792}

//試算表的ID，引號不能刪掉
var mySheetId='1IIy631u1x2Nt_lk0m-I0-DgunKBwWlYWtmxnmibTtX0';

var title='';
var users=[];

var totalSteps=0;
var myQuestions=[];

getQuestions();
//checkAnswer();

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
    //console.log(rows)
    myQuestions=rows;
    //console.log(myQuestions)
    totalSteps=myQuestions.length;
    //console.log('HAWB 已下載完畢！');
    // checkAnswer();
    checkAnswer('123-1234568')
  }
  });
  
}


function checkAnswer(myFilter){
  var i;
  for(var i =0; myQuestions.length; i++) {
    var filterHAWB = myQuestions[i].indexOf(myFilter);
    if(filterHAWB >= 0) {
      var type = filterHAWB + 1
      var remark = filterHAWB + 2
      console.log(myQuestions[i][type]);
      console.log(myQuestions[i][remark]);
      break;
    }else{
      console.log('can not find HAWB');
    }
    
  }
  //console.log(myQuestions.length)

}
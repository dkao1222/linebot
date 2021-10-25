const { GoogleSpreadsheet } = require('google-spreadsheet');

/**
 * @param  {String} docID the document ID
 * @param  {String} sheetID the google sheet table ID
 * @param  {String} credentialsPath the credentials path defalt is './credentials.json'
 */
async function getData(docID, sheetID, credentialsPath = './credentials.json') {
  const result = [];
  const doc = new GoogleSpreadsheet(docID);
  const creds = require(credentialsPath);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsById[sheetID];
  const rows = await sheet.getRows();
  for (row of rows) {
    result.push(row._rawData);
  }
  return result;
};


async function getRowCount(docID, sheetID, credentialsPath = './credentials.json') {
  var result = 0;
  const doc = new GoogleSpreadsheet(docID);
  const creds = require(credentialsPath);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsById[sheetID];
  const rows = await sheet.rowCount;
  //for (row of rows) {
  //  result.push(row._rawData);
  //}

  result = rows
  return result;
};

async function AddRow(docID, sheetID, credentialsPath = './credentials.json',userid, displayName,pictureUrl,statusMessage,Vendor,Name1,Name2) {
  const result = [];
  const doc = new GoogleSpreadsheet(docID);
  const creds = require(credentialsPath);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsById[sheetID];

  await sheet.addRow({userid, displayName,pictureUrl,statusMessage,Vendor,Name1,Name2})
  const rows = sheet.getRows();

  console.log(rows)
};

async function getRows(docID, sheetID, credentialsPath = './credentials.json',userid, displayName,pictureUrl,statusMessage,Vendor,Name1,Name2) {
  const result = [];
  const doc = new GoogleSpreadsheet(docID);
  const creds = require(credentialsPath);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsById[sheetID];

  //await sheet.
  const rows = await sheet.getRows();

  console.log(rows)
};


module.exports = {
  getData,
  getRowCount,
  AddRow,
  getRows,
};
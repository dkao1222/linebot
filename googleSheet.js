const { GoogleSpreadsheet } = require('google-spreadsheet');

/**
 * @param  {String} docID the document ID
 * @param  {String} sheetID the google sheet table ID
 * @param  {String} credentialsPath the credentials path defalt is './credentials.json'
 */
async function getData(docID, sheetID, credentialsPath = './credentials.json') {
  return new Promise((resolve, reject) => {
    try{
      const result = [];
      const doc = new GoogleSpreadsheet(docID);
      const creds = require(credentialsPath);
      await doc.useServiceAccountAuth(creds);
      await doc.loadInfo();
      console.log('doc title'+doc.title);
      const sheet = doc.sheetsById[sheetID];

      console.log('sheets title'+sheet.title);
      console.log('sheet row count'+sheet.rowCount);
      const rows = await sheet.getRows();

      for (row of rows) {
        result.push(row._rawData);
      }
      resolve(result)
    }catch (err) {
      reject(err)
    }
  })
  
  //return result;
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

async function AddRow(docID, sheetID, userid, displayName, pictureUrl, statusMessage, credentialsPath = './credentials.json') {
  //, userid, displayName, pictureUrl, statusMessage, Vendor, Name1, Name2
  const result = [];
  const doc = new GoogleSpreadsheet(docID);
  const creds = require(credentialsPath);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsById[sheetID];

  const createnewRow = await sheet.addRow({userId:userid, displayName:displayName, pictureUrl:pictureUrl, statusMessage:statusMessage, Vendor:'', Name1:'', Name2:''})
  //const larryRow = await sheet.addRow({ name: 'Larry Page', email: 'larry@google.com' });
  const rows = sheet.getRows();
  
  for (row of rows) {
    result.push(row._rawData);
  }
  return result;
  //console.log(rows)
};


module.exports = {
  getData,
  getRowCount,
  AddRow,
};
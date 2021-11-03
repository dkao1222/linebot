const express = require('express');

const { getData } = require('./googleSheet.js');
const { getRowCount } = require('./googleSheet.js');
const { AddRow } = require('./googleSheet.js');

const app = express();

app.use(function (req, res, next) {

    
    //res.setHeader('Access-Control-Allow-Origin', url);
    //res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.get('GET/UserData', (req, res) => {
    const resp = await getData('1lRu68z-02-W8uuVE4nOEMaZpjsi6ghBo6xobHZkQLiY', '1363045017');
    
    res.send(resp);

    
});

var server = app.listen(5050, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});



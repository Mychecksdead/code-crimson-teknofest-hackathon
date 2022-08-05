const express = require('express');
const cors = require('cors');
const request = require('request');
const mysql      = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    database : 'thy',
    user     : 'thyAdmin',
    password : 'thyAdmin',
});

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

var url = 'https://api.turkishairlines.com/test/searchpassenger';


app.post('/login', (req, res) => {
    console.log(req.body.username, req.body.PNR, req.body.lastname);

    var queryParams = '?' + encodeURIComponent('lastname') + '=' 
    + encodeURIComponent(req.body.lastname) + '&'
    + encodeURIComponent('pnr') + '=' 
    + encodeURIComponent(req.body.PNR) + '&' 
    + encodeURIComponent('name') + '=' 
    + encodeURIComponent(req.body.username) + '&' 
    + encodeURIComponent('title') + '=' 
    + encodeURIComponent('MRS');

    request({
        url: url + queryParams,
        method: 'GET',
        headers: {apikey: 'l7xxd23189fd6f9342ae8a6c2cad21f148a3', apisecret: '844c4484e5ad4c7d8489eaa87a31b1e9'}
    }, function (error, response, body) {
        console.log('Status', response.statusCode);
        console.log('Headers', JSON.stringify(response.headers));
        let data = JSON.parse(body);
        console.log('Data : ', data.data.TripData.PassengerInfoList.PassengerInfo.PassengerName.GivenName);
        console.log('Data : ', data.data.TripData.PassengerInfoList.PassengerInfo.PassengerName.Surname);
        res.send(data);
    });
});

app.listen(3001, () => {
    console.log('Running server...');
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as id ' + connection.threadId);
});


app.get('/getuser', (req, res) => {
    //req.query['smth']

    //debug
    //console.log(req);

    if(req.query['userID']){
        //TO DO : REGEX FOR SECURITY

        connection.query('SELECT * FROM userTable WHERE userID=' + req.query['userID'], function (error, results, fields) {
            if (error)
                throw error;
        
            results.forEach(result => {
                console.log(result);
                res.send(result);
                return;
            });
        });
    }else{
        res.send('Invalid Parameters');
    }
    
})
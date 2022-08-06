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

//TO DO: GENERATE UNIQUE TOKENS
function generateToken(n) {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var token = '';
    for(var i = 0; i < n; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
}

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
    
});

app.get('/getupdates', (req, res) => {
    //debug
    //console.log(req);

    if(req.query['baggageToken']){
        //TO DO : REGEX FOR SECURITY

        var sql = 'SELECT * FROM thy.baggageUpdates \
        JOIN thy.scannerTable ON baggageUpdates.scannerID = scannerTable.scannerID \
        JOIN thy.baggageTable ON baggageUpdates.baggageToken = baggageTable.baggageToken\
        WHERE baggageTable.baggageToken=\'' + req.query['baggageToken'] + '\'';
        connection.query(sql, function (error, results, fields) {
            if (error)
                throw error;
            
            var ret = {};

            results.forEach(result => {
                if(ret[result['baggageID']] == undefined){
                    ret[result['baggageID']] = {
                        baggageName: result['baggageName'],
                        scannerList: []
                    };
                }

                ret[result['baggageID']]['scannerList'].push({
                    scannerName: result['scannerName'],
                    updateTime: result['updateTime']
                });
    
            });
            
            console.log(ret);
            res.send(JSON.stringify(ret));
        });
    }else if(req.query['pnrID']){
        //TO DO : REGEX FOR SECURITY
        //TO DO : NAME CHECK

        var sql = 'SELECT * FROM thy.baggageUpdates \
        JOIN thy.scannerTable ON baggageUpdates.scannerID = scannerTable.scannerID \
        JOIN thy.baggageTable ON baggageUpdates.baggageToken = baggageTable.baggageToken\
        JOIN thy.userTable ON baggageTable.userID = thy.userTable.userID\
        JOIN thy.adminTable ON baggageTable.registrarAdminID = thy.adminTable.adminID\
        WHERE thy.userTable.pnrID=\'' + req.query['pnrID'] + '\'' ;
        connection.query(sql, function (error, results, fields) {
            if (error)
                throw error;
            
            var ret = {};

            results.forEach(result => {
                if(ret[result['baggageID']] == undefined){
                    ret[result['baggageID']] = {
                        baggageName: result['baggageName'],
                        registrarAdmin: result['adminName'],
                        scannerList: []
                    };
                }

                ret[result['baggageID']]['scannerList'].push({
                    scannerName: result['scannerName'],
                    updateTime: result['updateTime']
                });

            });

            console.log(ret);
            res.send(JSON.stringify(ret));
        });
    }else{
        res.send('Invalid Parameters');
    }
    
});

app.post('/gettoken', function(req, res) {
    const name = req.body.adminName;
    const pass = req.body.adminPass;
    
    var sql = 'SELECT * FROM thy.adminTable \
    WHERE thy.adminTable.adminName=\'' + name + '\' AND thy.adminTable.adminPass=\'' + pass + '\'';
    connection.query(sql, function (error, results, fields) {
        if (error)
            throw error;
        
        if(results.length < 1){
            res.send({token: NULL});
            return;
        }

        var token = generateToken(32);
        var sql = 'UPDATE thy.adminTable \
        SET thy.adminTable.adminToken = \''+ token + '\' \
        WHERE thy.adminTable.adminName=\'' + name + '\' AND thy.adminTable.adminPass=\'' + pass + '\'';
        connection.query(sql, function (error, results, fields) {
            if (error)
                throw error;
            
            console.log('new token : ' + token);
            res.send({token: token});
        });
    });
});
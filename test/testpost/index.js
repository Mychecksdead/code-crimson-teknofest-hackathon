const request = require('request');
/*
request.post(
    'http://localhost:3001/registerBaggage',
    { json: { 
    adminName: 'admin1', 
    adminPass: 'adminPass',
    baggageName: 'benimEsyam2',
    pnrID: 'HA1',
    ownerName: 'Eren', 
    ownerSurname: 'g' } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
);
*/


request.post(
    'http://localhost:3001/getupdates',
    { json: { pnrID: 'HA1', ownerName: 'Eren', ownerSurname: 'g' } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
);

/*
request.post(
    'http://localhost:3001/registerScanner',
    { json: { 
    adminName: 'admin1', 
    adminPass: 'adminPass',
    scannerName: 'Istanbul Airport 1'} },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
);
*/
/*
request.post(
    'http://localhost:3001/deleteBaggage',
    { json: { 
    adminName: 'admin1', 
    adminPass: 'adminPass',
    baggageToken: 'ABCD'} },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
);
*/

/*
request.post(
    'http://localhost:3001/scanBaggage',
    { json: { 
    scannerToken: 'zIxNGmQua4HfmzjuOwR5ykzhWdEGvJmt', 
    baggageToken: 'YEnlNdscEDQ6WErlyQfoklBPEGUIq850'} },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
);
*/
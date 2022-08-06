const request = require('request');

request.post(
    'http://localhost:3001/gettoken',
    { json: { adminName: 'admin1', adminPass: 'adminPass' } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
);
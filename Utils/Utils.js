const request = require('request');

const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
};

let options = {
    url:"",
    method: 'POST',
    headers: headers,
    json: ""
};

module.exports = {

    sendRequest: function (data,req_url) {

        options.url = req_url;

        options.json = data;

        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) console.log(body);
            else console.log(error);
        });
    },

    sendDelayedRequestToSlashCommandOnSuccess: function (req_url) {
        let successData = {
            "response_type": "in_channel",
            "text": "Successfully Uploaded the time sheets"
        };


        sendRequest(successData,req_url)
    },

    sendDelayedRequestToSlashCommandOnFailure: function (req_url) {
        let errorData = {
            "response_type": "ephemeral",
            "text": err
        };

        sendRequest(errorData,req_url);
    },

    sendImmediateResponse: function (data, res) {
        res.setHeader('content-type', 'application/json');

        res.status(200);

        res.send(data);
    }
};
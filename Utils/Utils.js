const request = require('request');

const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
};

let options = {
    url: req.body.response_url,
    method: 'POST',
    headers: headers,
    json: ""
};

module.exports = {

    sendRequest: function (data) {

        options.json = data;

        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) console.log(body);
            else console.log(error);
        });
    },

    sendDelayedRequestToSlashCommandOnSuccess: function () {
        let successData = {
            "response_type": "in_channel",
            "text": "Successfully Uploaded the time sheets"
        };

        sendRequest(successData)
    },

    sendDelayedRequestToSlashCommandOnFailure: function () {
        let errorData = {
            "response_type": "ephemeral",
            "text": err
        };

        sendRequest(errorData);
    },

    sendImmediateResponse: function (data, res) {
        res.setHeader('content-type', 'application/json');

        res.status(200);

        res.send(data);
    }
};
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let googleSheetsApiService = require('./services/GoogleSheetsApiService');
let Utils = require('./Utils/Utils');
let Config = require("./config/Config");

app.use(bodyParser.urlencoded({extended: true}));

app.post(Config.slashCommand, function (req, res) {
    let values = [];
    let message = req.body.text.split(Config.slashCommandDelimiter);
    let name = req.body.user_name;
    values.push(name, message);
    let mergedValues = [].concat.apply([], values);
    let data = {
        "response_type": "in_channel",
        "text": "Uploading time sheets in progress..."
    };

    Utils.sendImmediateResponse(data,res);

    googleSheetsApiService.insertValuesIntoGoogleSheet(mergedValues).then(function (response) {

        console.log(response);

        Utils.sendDelayedRequestToSlashCommandOnSuccess(req.body.response_url);

    }).catch(function (error) {

        console.log(error);

        Utils.sendDelayedRequestToSlashCommandOnFailure(req.body.response_url);
    });
});

app.listen(Config.serverPort);
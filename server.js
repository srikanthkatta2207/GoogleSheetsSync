let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let googleSheetsApiService = require('./services/GoogleSheetsApiService');

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/test', function(req, res) {
    let values = [];
    let message = req.body.text.split(" ");
    let name = req.body.user_name;
    values.push(name,message);
    let mergedValues = [].concat.apply([],values);
    googleSheetsApiService.insertTheValuesIntoGoogleSheet(mergedValues).then(function (response) {

        let successData = {
            "response_type": "in_channel",
            "text": response
        };
       res.status(200);
       res.setHeader('content-type', 'application/json');
       res.send(successData);
    }).catch(function (err) {
        let errorData = {
            "response_type": "ephemeral",
            "text": err
        };
        res.setHeader('content-type', 'application/json');
        res.status(404).send(errorData)
    });
});
app.listen(8080);

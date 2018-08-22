var oAuthService = require("./OAuthService");
const {google} = require('googleapis');
const Promise = require('promise');
const Config = require('../config/Config');

module.exports = {
    insertTheValuesIntoGoogleSheet: function (values) {
        return new Promise(function (onSuccess, onFailure) {
            return oAuthService.getOauthObject().then(function (auth) {
                const sheets = google.sheets({version: 'v4', auth});
                return getRangeString(auth).then(function (rangeValue) {
                    sheets.spreadsheets.values.update({
                        spreadsheetId: Config.spreadsheetId,
                        range: rangeValue,
                        valueInputOption: Config.valueInputOption,
                        resource: {
                            majorDimension: Config.majorDimension,
                            values: [[values[0], values[1], values[2]]]
                        }
                    }, (err, res) => {
                        if (err) return onFailure(err);
                        console.log("hellop")
                        return onSuccess(res);
                    });
                })
            })
        });
    }
};

let getRangeString = function (auth) {
    return new Promise(function (onSuccess, onFailure) {
        const sheets = google.sheets({version: 'v4', auth});
        let asciiValue = 64;
        sheets.spreadsheets.get({
            spreadsheetId: Config.spreadsheetId,
            includeGridData: Config.includeGridData
        }, function (err, response) {
            if (err) return onFailure('The API returned an error: ' + err);
            let rowData = response.data.sheets[0].data[0].rowData;
            let numberOfRows = rowData.length;
            let numberOfColumns = rowData[0].values.length;
            let columnChar = String.fromCharCode(asciiValue + numberOfColumns);
            let rangeValue = "Sheet1!A" + (numberOfRows + 1) + ":" + columnChar + (numberOfRows + 1);
            return onSuccess(rangeValue);
        })
    })
};
const fs = require('fs');
const {google} = require('googleapis');
const Promise = require('promise');
const Config = require('../config/Config');

module.exports = {
    getOauthObject: function () {
        return new Promise(function (onSuccess, onFailure) {
            fs.readFile(Config.credentialsPath, (err, content) => {
                if (err) return onFailure('Error loading client secret file:', err);
                let credentials = JSON.parse(content);
                const {client_secret, client_id, redirect_uris} = credentials.installed;
                const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
                fs.readFile(Config.tokenPath, (err, token) => {
                    if (err) onFailure(err);
                    oAuth2Client.setCredentials(JSON.parse(token));
                    return onSuccess(oAuth2Client);
                });
            });
        });
    }
};
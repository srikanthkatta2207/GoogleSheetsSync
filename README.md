# TimeCardSlackBot
A slack bot implementing slash command to post the employee time card information to configured google sheets.You can integrate this slack bot to your slack.

## Prerequisites

`Node >= 6.4`

## How to configure

`credentilas.json` file which contains the information about your slack app. When you configured your slack app it will provided you the credentials.json file. You can mention the path to the file in config.json (credentialsPath).

link to create slack app ``https://api.slack.com/apps``

`token.json` file which contains information about how our server can talk to google sheets api. You can generate this file by running `node index.js`, then it will provided you the link then you can open that in browser then it will ask for the which google account you want to give you the access after you sign in it will generate some random code which you need it to enter into the terminal where you run index.js then it will dowloand token.json file. You can mention path to file to key in config.json (tokenPath).

link to create token.json file ``https://developers.google.com/sheets/api/quickstart/nodejs``

when you create the slack app, you can create the your own slash commands in that app. Create one slash command using the below link ``https://api.slack.com/slash-commands``. Give that slash command name in config.json (slashCommand). default slash command will be `/sendTimeCards`.

You can give google spreadsheet id in config.json to which you want to add you values from slack.

default port will be on 8080. You can configure required port on config.json.

## How to run

`npm install` in the root of the directory, which downloads all required libraries.
`node server.js`

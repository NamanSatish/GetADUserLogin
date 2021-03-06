const Shell = require('node-powershell');
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const path = require('path');
const date = new Date()
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Drive API.
  authorize(JSON.parse(content), "");
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    drive = google.drive({version: 'v3', auth: oAuth2Client});
;    //callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      
    });
  });
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

try{
  fs.unlinkSync('myfile.csv')
  console.log('File deleted!');
}catch (err) {
  console.log("File Didn't exist");
  // if no error, file has been deleted successfully
}
// Load client secrets from a local file.

const location = "PS\\ADUser.ps1"
const ps = new Shell({                  // Constructor function, creating a new object
  executionPolicy: 'Bypass',            // Nothing is blocked and there are no warnings or prompts
  noProfile: true
});

ps.addCommand(location)  // Point the PS Script you want to use
ps.invoke()
.then(output => {
    console.log("File Created!");
    var fileMetadata = {
      'name': 'CSV ' + date,
      'mimeType': 'application/vnd.google-apps.spreadsheet'
    };
    var media = {
      mimeType: 'text/csv',
      body: fs.createReadStream('myfile.csv')
    };
    drive.files.create({
      resource: fileMetadata,
      media: media,
      
    }, function (err, file) {
      if (err) {
        // Handle error
        console.log("Check Sheets")
        console.error(err);
      } else {
        console.log('File Id:', file.data.id);
      }
    });
    ps.dispose();                
})
.catch(err => {
  console.log(err);
  ps.dispose();  
})

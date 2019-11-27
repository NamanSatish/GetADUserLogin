const Shell = require('node-powershell');
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const path = require('path');
const authorize = require("C:\\dev\\GetADUserLogin\\authorize.js")
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';
try{
  fs.unlinkSync('myfile.csv')
  console.log('File deleted!');
}catch (err) {
  console.log(err);
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
    console.log(output);
    ps.dispose();                
})
.catch(err => {
  console.log(err);
  ps.dispose();  
})

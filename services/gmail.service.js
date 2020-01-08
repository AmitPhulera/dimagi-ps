const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const gmail = google.gmail({version: 'v1'});


const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];

const TOKEN_PATH = "token.json";

/**
 * Create a authentication object to be used for every API requests
 * @return {Object} auth object that is required for all API requests
 */
function prepareAuthObj() {
  let content = {};
  try {
    content = fs.readFileSync("credentials.json");
    return getAuthObj(JSON.parse(content));
  } catch (err) {
    throw Error(err);
  }
}
/**
 * from provided token path, reads the token and prepares the auth object
 * @param {Object} credentials 
 * 
 */
function getAuthObj(credentials) {
  try {
    token = fs.readFileSync(TOKEN_PATH);
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );
    oAuth2Client.setCredentials(JSON.parse(token));
    return oAuth2Client;
  } catch (err) {
    console.log(
      "Please generate a new token for the email, look the link for details https://developers.google.com/gmail/api/quickstart/nodejs"
    );
    throw Error("Token not present in the path");
  }
}
/**
 * Returns list of emails
 * @param {Object} auth 
 * @param {string} lastEvaluatedKey 
 */
async function listEmails(auth, lastEvaluatedKey) {
  return gmail.users.messages.list({
      auth,
      userId:'me'
  });
  
//   let mailList = await listEmails({ userId: "me",auth });
//   return mailList;
}
module.exports = {
  prepareAuthObj,
  listEmails,
};

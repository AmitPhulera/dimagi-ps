const gmail = require('./services/gmail.service');
const {prepareAuthObj,listEmails} = gmail;
const authObj = prepareAuthObj();

async function init(){
    let list = await listEmails(authObj);
    // gmail.listLabels(authObj);
    console.log(list)
};
init();
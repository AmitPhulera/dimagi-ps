const {prepareAuthObj,listEmails,getDetailedMailInfo} = require('./services/gmail.service');
const {getLocationInfo} = require('./services/location.service');



async function init(){
    const authObj = prepareAuthObj();
    const list = await listEmails(authObj);
    const {messages} = list.data;
    const details = await getDetailedMailInfo(authObj,"me",messages[0].id);
    const {location,from,date,id} = details;
    const locationInfo =await getLocationInfo(location); 
    const packetToBeSaved = {...details,...locationInfo};  
    
};
init();
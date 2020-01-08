const axios = require("axios");
const LOCATION_API = "http://api.geonames.org/searchJSON";
/**
 * for a given fuzzy location figures out the exact location
 * @param {string} userEnteredLocation
 *  @returns {null} if no location is available
 * @returns {object} detailed info about the place
 */
async function getLocationInfo(userEnteredLocation) {
  const locationData = await axios.get(LOCATION_API, {
    params: {
      q: userEnteredLocation,
      maxRows: 1,
      username: "dimagi"
    }
  });
  if (locationData.data.geonames.length === 0) return null;
  const locationInfo = locationData.data.geonames[0];
  const { lat, lng, name, countryName } = locationInfo;
  return { lat, lng, name, userEnteredLocation, countryName };
}
module.exports={
    getLocationInfo,
}
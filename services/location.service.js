const axios = require("axios");
const LOCATION_API = "http://api.geonames.org/searchJSON";
/**
 * for a given fuzzy location figures out the exact location
 * @param {string} user_location
 *  @returns {null} if no location is available
 * @returns {object} detailed info about the place
 */
async function getGeoCordinates(user_location) {
  const locationData = await axios.get(LOCATION_API, {
    params: {
      q: user_location,
      maxRows: 1,
      username: "dimagi"
    }
  });
  if (locationData.data.geonames.length === 0) return null;
  const locationInfo = locationData.data.geonames[0];
  const { lat, long, name, countryName } = locationInfo;
  return { lat, long, name, user_location, countryName };
}

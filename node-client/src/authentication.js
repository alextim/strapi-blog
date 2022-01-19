/* eslint-disable consistent-return */
/* eslint-disable no-console */
const axios = require('axios');

module.exports = async ({ loginData, reporter, apiURL }) => {
  const validIndentifier = loginData.identifier && loginData.identifier.length !== 0;
  const validPassword = loginData.password && loginData.password.length !== 0;

  console.log(loginData);
  if (!validIndentifier) {
    console.log('Not valid id');
    return;
  }
  if (!validPassword) {
    console.log('Not valid pwd');
    return;
  }
  // const authenticationActivity = reporter.activityTimer(`Authenticate Strapi User`);
  // authenticationActivity.start();

  // Make API request.
  try {
    const loginResponse = await axios.post(`${apiURL}/api/auth/local`, loginData);
    // authenticationActivity.end();
    if (loginResponse.data) {
      return loginResponse.data.jwt;
    }
  } catch (e) {
    reporter.panic(`${e.response.status} ${e.response.statusText}`);
  }

  return null;
};

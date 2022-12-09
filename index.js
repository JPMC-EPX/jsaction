const core = require('@actions/core');
const wait = require('./wait');


// most @actions toolkit packages have async methods
async function run() {
  try {
    const cjToken = core.getInput('cjToken');

    const request = require('request');

    const jetIdpRequest = {
      url: 'https://jet-idp-api-ifa.gaiacloud.jpmchase.net/api/jeti/accessToken/JPMC:URI:RS-33017-70436-RepoServices-PROD?environment=prod',
      method: 'GET',
      headers: {
        'cj-token': cjToken
      }
    }

    request(jetIdpRequest, function(error, response, body){
      console.error('error: ', error);
      console.log('statusCode ', response && response.statusCode);
      console.log('body: ', body);
      core.exportVariable('SONAR_KEY', body);
    });

    
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

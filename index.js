const core = require('@actions/core');
const wait = require('./wait');


// most @actions toolkit packages have async methods
async function run() {
  try {
    const ms = core.getInput('milliseconds');
    core.info(`Waiting ${ms} milliseconds ...`);

    core.debug((new Date()).toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    await wait(parseInt(ms));
    core.info((new Date()).toTimeString());

    core.setOutput('time', new Date().toTimeString());

    const request = require('request');

    request('https://sonar-routing-api.prod.aws.jpmchase.net/get_token', function(error, response, body){
      console.error('error: ', error);
      console.log('statusCode ', response && response.statusCode);
      console.log('body: ', body);
    });

    
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

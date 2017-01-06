const request = require('request');

let Service;
let Characteristic;

function LightAccessory(log, config) {
  this.log = log;
  this.name = config.name;
  this.username = config.username;
  this.password = config.password;
  this.lightId = config.light_id;
  this.serverAddress = config.server_address;

  this.service = new Service.Lightbulb(this.name);

  this.service
    .getCharacteristic(Characteristic.On)
    .on('get', this.getState.bind(this))
    .on('set', this.setState.bind(this));

  // TODO: Add sensor services
}

LightAccessory.prototype.getState = function (callback) {
  this.log('Getting current state...');

  request.get({
    url: `${this.serverAddress}/light/${this.lightId}`,
    auth: { username: this.username, password: this.password },
  }, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      this.log('Light state is %s', body);
      const on = body.trim() === '1';
      callback(null, on); // success
    } else {
      this.log('Error getting state (status code %s): %s', response.statusCode, err);
      callback(err);
    }
  });
};

LightAccessory.prototype.setState = function (state, callback) {
  const lightState = state ? 'enable' : 'disable';
  this.log('Set state to %s for light %s', lightState, this.lightId);

  request.get({
    url: `${this.serverAddress}/groups/${this.lightId}/${lightState}/true`,
    auth: { username: this.username, password: this.password },
  }, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      this.log('State change complete.');
      callback(null); // success
    } else {
      this.log("Error '%s' setting light state. Response: %s", err, body);
      callback(err || new Error('Error setting light state.'));
    }
  });
};

LightAccessory.prototype.getServices = function () {
  return [this.service];
};

module.exports = function (homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

  homebridge.registerAccessory('homebridge-lights', 'light', LightAccessory);
};

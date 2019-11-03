const EventEmitter = require('events');
class NewApiEmitter extends EventEmitter {}
global.newApiEvents = new NewApiEmitter();
const { setCustomApi } = require('../utils/utils');

newApiEvents.on('setApi', (app) => {
  setCustomApi(app)
});
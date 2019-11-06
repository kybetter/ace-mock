const EventEmitter = require('events');
class NewApiEmitter extends EventEmitter {}
global.apiEvents = new NewApiEmitter();
const { setCustomApi } = require('../utils/utils');

apiEvents.on('setApi', (app) => {
  setCustomApi(app)
});
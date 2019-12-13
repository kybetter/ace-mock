const express = require('express')
const cors = require('cors')
const http = require('http')
const PouchDB = require('pouchdb')
const socket = require('./socket/socket')
const EventEmitter = require('events')
const aceRouters = require('./ace-router/router')
const setCustomApi = require('./custom-router/router');

function setGlobal(context) {
  global.router = null;

  class NewApiEmitter extends EventEmitter { };
  global.apiEvents = new NewApiEmitter();

  global.globalIdDb = new PouchDB(context.globalIdDbName);
  global.normalApiDb = new PouchDB(context.normalApiDbName);
}


module.exports = async function run(context) {
  setGlobal(context);

  const app = express();
  const server = http.createServer(app);
  
  try {
    await globalIdDb.get("global_id");
  } catch(e) {
    try {
      await globalIdDb.put({ _id: "global_id", id: 0 });
    } catch(err) {
      throw err;
    }
  }

  // start webSocket
  socket(server);

  apiEvents.on('setApi', () => {
    setCustomApi()
  });

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/ace-mock-api', aceRouters(app));

  try {
    await setCustomApi();
  } catch(e) {
    throw e;
  }

  app.use((req, res, next) => {
    router.handle(req, res, next)
  })

  const { port, staticPath } = context;
  app.use('/', express.static(staticPath))
  server.listen(port, () => {
    process.stdout.write(`ace-mock listen at: http://localhost:${port}`);
  })
}

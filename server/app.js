const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').createServer(app);
const { createMockFile, setCustomApi } = require('./utils/utils');

function run(context) {
  // create mock file at first run, and set "mockFile" global variable.
  createMockFile();
  require('./socket/socket')(server);
  require('./events/create-api');

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/ace-mock-api', require('./ace-router/router')(app));
  setCustomApi(app);

  const { port, staticPath } = context;
  app.use('/', express.static(staticPath))
  server.listen(port, () => {
    process.stdout.write(`ace-mock listen at: http://localhost:${port}`);
  })
}

module.exports = { run };

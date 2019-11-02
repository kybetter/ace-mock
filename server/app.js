const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').createServer(app);
const { createMockFile } = require('./utils/utils');

function run(context) {
  // create mock file at first run, and set "mockFile" global variable.
  createMockFile();
  require('./socket/socket')(server);
  app.use(cors());
  app.use('/ace-mock-api', require('./router'));
  // add websocket server
  const { port, staticPath } = context;
  app.use('/', express.static(staticPath))
  server.listen(port, () => {
    process.stdout.write(`ace-mock listen at: http://localhost:${port}`);
  })
}

module.exports = { run };

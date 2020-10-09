const express = require("express");
const cors = require("cors");
const http = require("http");
const PouchDB = require("pouchdb");
const socket = require("./socket/socket");
const EventEmitter = require("events");
const aceRouters = require("./ace-router/router");
const setCustomApi = require("./custom-router/router");
const path = require("path");
const fs = require("fs");

const uploadPath = path.resolve(process.env.HOME, "ace_mock_uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

function setGlobal(config) {
  global.router = null;

  class NewApiEmitter extends EventEmitter {}
  global.apiEvents = new NewApiEmitter();

  global.db = new PouchDB(path.resolve(process.env.HOME, "ace_mock"));
  global.port = config.port;
}

module.exports = async function run(config) {
  setGlobal(config);

  const app = express();
  const server = http.createServer(app);

  // start webSocket
  socket(server);

  apiEvents.on("setApi", () => {
    setCustomApi();
  });

  // app.use(cors({ credentials: true, origin: true }));
  app.use(cors());
  // app.use(function (req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  //   res.header("Access-Control-Allow-Headers", "Content-Type");

  //   next();
  // });
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/ace-mock-api", aceRouters(app));

  try {
    await setCustomApi();
  } catch (e) {
    throw e;
  }

  app.use((req, res, next) => {
    router.handle(req, res, next);
  });

  const { port } = config;
  app.use("/", express.static(path.resolve(__dirname, "..", "dist")));
  app.use("/files", express.static(uploadPath));

  server.listen(port, () => {
    process.stdout.write(`ace-mock listen at: http://127.0.0.1:${port}`);
    const { spawn } = require("child_process");
    spawn("open", [`http://127.0.0.1:${port}`]);
  });
};

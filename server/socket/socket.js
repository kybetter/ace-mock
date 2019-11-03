const writeMock = require('./write-mock');

module.exports = server => {
  const io = require('socket.io')(server);
  io.on('connection', socket => {
    writeMock(socket);
  })
}

const mock = require(mockFile);
const fs = require('fs');

module.exports = (socket) => {
  const normalapi = mock.normalapi;
  socket.on('setValue', value => {
    normalapi.forEach(api => {
      if (api.id !== undefined) {
        api.content = value.content;
      }
    })
    fs.writeFileSync(mockFile, JSON.stringify(mock));
  })
}


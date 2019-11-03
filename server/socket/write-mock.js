module.exports = (socket) => {
  const fs = require('fs');
  socket.on('setValue', value => {
    const mock = require(mockFile);
    const normalapi = mock.normalapi;

    normalapi.forEach(api => {
      if (api.id === value.id) {
        api.content = value.content;
      }
    })
    fs.writeFileSync(mockFile, JSON.stringify(mock));
  })
}

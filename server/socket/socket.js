const socketIO = require('socket.io');
const setCustomApi = require('../custom-router/router');

module.exports = server => {
  const io = socketIO(server);
  io.on('connection', socket => {
    socket.on('setValue', async value => {
      try {
        const normalApi = await db.get(value.id);
        await db.put({
          _id: normalApi._id,
          _rev: normalApi._rev,
          apiName: normalApi.apiName,
          apiPath: normalApi.apiPath,
          method: normalApi.method,
          content: value.content,
        })
        await setCustomApi();
      } catch(e) {
        throw e;
      }
    })
  })
}

module.exports = (app) => {
  const express = require('express');
  const router = express.Router();

  // /ace-mock-api/get-normal-api-list
  router.post('/get-normal-api-list', (req, res) => {
    const mock = require(mockFile);
    res.send({
      code: 200,
      message: 'ok',
      data: mock.normalapi
    });
  })

  function checkApiExist(req, res) {
    if (
      req.body.name.indexOf('ace-mock-api') !== -1 ||
      req.body.name.indexOf('graphql') !== -1
    ) {
      res.send({
        code: 400,
        message: '"ace-mock-api" or "graphql" api name alredy in used.',
      });
      return false;
    }
    return true;
  }

  // /ace-mock-api/create-normal-api
  router.post('/create-normal-api', (req, res) => {
    if (!checkApiExist(req, res)) return;
    const mock = require(mockFile);
    const newApi = {
      id: ++mock.globalId,
      name: req.body.name,
      method: req.body.method,
      content: "",
    };
    mock.normalapi.unshift(newApi)
    const fs = require('fs');
    fs.writeFileSync(mockFile, JSON.stringify(mock));
    apiEvents.emit('setApi', app);

    res.send({
      code: 200,
      message: 'ok',
      data: newApi,
    });
  })

  // /ace-mock-api/edit-normal-api
  router.post('/edit-normal-api', (req, res) => {
    if (!checkApiExist(req, res)) return;
    const mock = require(mockFile);
    let editItem = null;
    mock.normalapi.forEach(item => {
      if (item.id === req.body.id) {
        editItem = item;
        item.name = req.body.name;
        item.method = req.body.method;
      }
    })
    const fs = require('fs');
    fs.writeFileSync(mockFile, JSON.stringify(mock));
    apiEvents.emit('setApi', app);

    res.send({
      code: 200,
      message: 'ok',
      data: editItem,
    });
  })

  //////////////////////////////

  return router;
};

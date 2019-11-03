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

  // /ace-mock-api/create-normal-api
  router.post('/create-normal-api', (req, res) => {
    if (
      req.body.name.indexOf('ace-mock-api') !== -1 ||
      req.body.name.indexOf('graphql') !== -1
    ) {
      res.send({
        code: 400,
        message: '"ace-mock-api" or "graphql" api name alredy in used.',
      });
      return;
    }
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
    newApiEvents.emit('setApi', app);

    res.send({
      code: 200,
      message: 'ok',
      data: newApi,
    });
  })
  return router;
};
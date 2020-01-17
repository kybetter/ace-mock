const express = require('express');
const setCustomApi = require('../custom-router/router');
const uuidv4 = require('uuid/v4');

function checkApiExist(req, res) {
  if (
    req.body.api.indexOf('ace-mock-api') !== -1 ||
    req.body.api.indexOf('graphql') !== -1
  ) {
    res.send({
      code: 400,
      message: '"ace-mock-api" or "graphql" api name alredy in used.',
    });
    return false;
  }
  return true;
}

module.exports = (app) => {
  const router = express.Router();

  // /ace-mock-api/get-normal-api-list
  router.post('/get-normal-api-list', async (req, res) => {
    try {
      const apiList = await normalApiDb.allDocs({include_docs: true});
      res.send({
        code: 200,
        message: 'ok',
        data: apiList,
      });
    } catch {
      res.send({
        code: 400,
        message: 'error',
      });
    }
    
  })

  // /ace-mock-api/create-normal-api
  router.post('/create-normal-api', async (req, res) => {
    try {
      if (!checkApiExist(req, res)) return;
    
      const newApi = {
        _id: uuidv4(),
        api: req.body.api,
        method: req.body.method,
        content: "",
      };
      
      await normalApiDb.put(newApi);
  
      await setCustomApi();
  
      res.send({
        code: 200,
        message: 'ok',
        data: newApi,
      });
    } catch {
      res.send({
        code: 400,
        message: 'error',
      });
    }
  })

  // /ace-mock-api/edit-normal-api
  router.post('/edit-normal-api', async (req, res) => {
    try {
      if (!checkApiExist(req, res)) return;

      const normalApi = await normalApiDb.get(req.body._id);
      normalApi.api = req.body.api;
      normalApi.method = req.body.method;
  
      await normalApiDb.put({
        _id: normalApi._id,
        _rev: normalApi._rev,
        api: req.body.api,
        method: req.body.method,
        content: normalApi.content,
      })
  
      await setCustomApi();
  
      res.send({
        code: 200,
        message: 'ok',
        data: normalApi,
      });
    } catch {
      res.send({
        code: 400,
        message: 'error',
      });
    }
    
  })

  router.post('/delete-normal-api', async (req, res) => {
    try {
      const normalApi = await normalApiDb.get(req.body._id);
      await normalApiDb.remove(normalApi);
  
      await setCustomApi();
  
      res.send({
        code: 200,
        message: 'ok',
      });
    } catch(e) {
      res.send({
        code: 400,
        message: 'error',
      });
    }
  })

  //////////////////////////////

  return router;
};

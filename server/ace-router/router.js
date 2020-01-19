const express = require('express');
const setCustomApi = require('../custom-router/router');
const uuidv4 = require('uuid/v4');

function checkApiExist(req, res) {
  if (
    req.body.apiPath.indexOf('/ace-mock-api') === 0
  ) {
    res.send({
      code: 400,
      message: '不能使用 /ace-mock-api 开头的路径',
    });
    return false;
  }
  return true;
}

module.exports = (app) => {
  const router = express.Router();

  // /ace-mock-api/api-list
  router.post('/api-list', async (req, res) => {
    try {
      const apiList = await db.allDocs({include_docs: true});
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

  // /ace-mock-api/create-api
  router.post('/create-api', async (req, res) => {
    try {
      if (!checkApiExist(req, res)) return;

      const newApi = {
        _id: uuidv4(),
        apiName: req.body.apiName,
        method: req.body.method,
        apiPath: req.body.apiPath,
        content: "",
      };
      
      await db.put(newApi);
  
      await setCustomApi();
  
      res.send({
        code: 200,
        message: 'ok',
        data: newApi,
      });
    } catch(e) {
      res.send({
        code: 400,
        message: e,
      });
      throw e;
    }
  })

  // /ace-mock-api/edit-api
  router.post('/edit-api', async (req, res) => {
    try {
      if (!checkApiExist(req, res)) return;

      const detail = await db.get(req.body._id);

      const update = {
        apiName: req.body.apiName,
        method: req.body.method,
        apiPath: req.body.apiPath,
        content: detail.content,
      }

      await db.put({
        _id: detail._id,
        _rev: detail._rev,
        ...detail,
      })
  
      await setCustomApi();
  
      res.send({
        code: 200,
        message: 'ok',
        data: update,
      });
    } catch {
      res.send({
        code: 400,
        message: 'error',
      });
    }
    
  })

  router.post('/delete-api', async (req, res) => {
    try {
      const detail = await db.get(req.body._id);
      await db.remove(detail);
  
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

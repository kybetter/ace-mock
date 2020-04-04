const express = require('express');
const setCustomApi = require('../custom-router/router');
const { v4: uuidv4 } = require('uuid');
const { checkApiExist } = require('../utils/tools');

module.exports = (app) => {
  const router = express.Router();

  // /ace-mock-api/api-list
  router.post('/api-list', async (req, res) => {
    try {
      const apiList = await db.allDocs({ include_docs: true });
      res.send({
        code: 200,
        message: 'ok',
        data: apiList,
      });
    } catch(e) {
      res.send({
        code: 400,
        message: e.message,
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
    } catch (e) {
      res.send({
        code: 400,
        message: e.message,
      });
      throw e;
    }
  })

  // /ace-mock-api/edit-api
  router.post('/edit-api', async (req, res) => {
    try {
      if (!checkApiExist(req, res)) return;

      const detail = await db.get(req.body._id);

      const updateData = {
        apiName: req.body.apiName,
        method: req.body.method,
        apiPath: req.body.apiPath,
        content: detail.content,
      }

      await db.put({
        _id: detail._id,
        _rev: detail._rev,
        ...updateData,
      })

      await setCustomApi();

      res.send({
        code: 200,
        message: 'ok',
        data: {
          id: detail._id,
          ...updateData,
        },
      });
    } catch (e) {
      res.send({
        code: 400,
        message: e.message,
      });
      throw e;
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
    } catch (e) {
      res.send({
        code: 400,
        message: e.message,
      });
      throw e;
    }
  })

  //////////////////////////////

  return router;
};

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
  const express = require('express');
  const router = express.Router();

  // /ace-mock-api/get-normal-api-list
  router.post('/get-normal-api-list', async (req, res) => {
    const apiList = await normalApiDb.allDocs({include_docs: true});
    res.send({
      code: 200,
      message: 'ok',
      data: apiList,
    });
  })

  // /ace-mock-api/create-normal-api
  router.post('/create-normal-api', async (req, res) => {
    if (!checkApiExist(req, res)) return;
    
    const globalId = await globalIdDb.get('global_id');

    const newApi = {
      _id: `${globalId.id}`,
      api: req.body.api,
      method: req.body.method,
      content: "",
    };
    
    await normalApiDb.put(newApi);

    await globalIdDb.put({
      _id: 'global_id',
      _rev: globalId._rev,
      id: globalId.id += 1,
    });

    apiEvents.emit('setApi');

    res.send({
      code: 200,
      message: 'ok',
      data: newApi,
    });
  })

  // /ace-mock-api/edit-normal-api
  router.post('/edit-normal-api', async (req, res) => {
    if (!checkApiExist(req, res)) return;

    const normalApi = await normalApiDb.get(req.body.id);
    normalApi.api = req.body.api;
    normalApi.method = req.body.method;

    await normalApiDb.put({
      _id: normalApi._id,
      _rev: normalApi._rev,
      api: req.body.api,
      method: req.body.method,
    })

    res.send({
      code: 200,
      message: 'ok',
      data: normalApi,
    });
  })

  //////////////////////////////

  return router;
};

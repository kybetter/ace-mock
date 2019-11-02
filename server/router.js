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

router.post('test', (req, res) => {
  res.send('test');
})


module.exports = router;
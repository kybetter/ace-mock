const express = require('express');
const Mock = require('mockjs');

module.exports = async function setCustomApi() {
  // make sure old api is not avaliable.
  router = new express.Router();
  try {
    const apiList = await normalApiDb.allDocs({ include_docs: true });
    apiList.rows.forEach(item => {
      router[item.doc.method.toLowerCase()](item.doc.api, (req, res) => {
        try {
          const obj = JSON.parse(item.doc.content);
          res.send(Mock.mock(obj));
        } catch(e) {
          res.send(item.doc.content);
        }
      })
    })
  } catch(e) {
    throw e;
  }
}
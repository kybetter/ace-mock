const express = require('express');
const Mock = require('mockjs');

module.exports = async function setCustomApi() {
  // make sure old api is not avaliable.
  router = new express.Router();
  try {
    const apiList = await normalApiDb.allDocs({ include_docs: true });
    apiList.rows.forEach(item => {
      router[item.doc.method.toLowerCase()](item.doc.api, (req, res) => {
        if (item.doc.content.indexOf('<') === 0 || item.doc.content.indexOf('//') !== -1) {
          res.send(Mock.mock(item.doc.content));
        } else {
          res.send(Mock.mock(JSON.parse(item.doc.content)));
        }
      })
    })
  } catch(e) {
    throw e;
  }
}
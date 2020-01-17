const express = require('express');
const Mock = require('mockjs');
const multer = require('multer');
const path = require('path');

const uploadPath = path.resolve(process.env.HOME, 'ace_mock_uploads');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').reverse()[0];
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  }
})

const upload = multer({ storage: storage });

module.exports = async function setCustomApi() {
  // make sure old api is not avaliable.
  router = new express.Router();
  try {
    const apiList = await normalApiDb.allDocs({ include_docs: true });
    apiList.rows.forEach(item => {
      router[item.doc.method.toLowerCase()](item.doc.api, upload.single('file'), (req, res) => {
        let content = item.doc.content
        try {
          // 返回上传文件链接
          if (req.file) {
            content = content.replace('@upload()', `http://localhost:${port}/files/${req.file.filename}`)
          }
          // 返回用户请求的字段
          const reqKeys = Object.keys(req.body);
          if (reqKeys.length > 0) {
            reqKeys.forEach(key => {
              content = content.replace(`@request(${key})`, req.body[key]);
            })
          }
          const obj = JSON.parse(content);
          res.send(Mock.mock(obj));
        } catch(e) {
          res.send(content);
        }
      })
    })
  } catch(e) {
    throw e;
  }
}
const express = require('express');
const Mock = require('mockjs');
const multer = require('multer');
const path = require('path');

// 设置上传文件夹
const uploadPath = path.resolve(process.env.HOME, 'ace_mock_uploads');

// 配置上传路径和文件名
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
  // 使用新的路由实例，用以让老路由失效
  router = new express.Router();
  try {
    const apiList = await db.allDocs({ include_docs: true });
    apiList.rows.forEach(item => {
      router[item.doc.method.toLowerCase()](item.doc.apiPath, upload.array('file'), (req, res) => {
        let { content } = item.doc;
        try {
          // func1: 返回上传文件链接
          if (Array.isArray(req.files)) {
            if (req.files.length > 1) {
              const uploadUrls = [];
              req.files.forEach(file => {
                uploadUrls.push(`http://localhost:${port}/files/${file.filename}`)
              })
              content = content.replace('"@upload()"', JSON.stringify(uploadUrls));
            } else {
              content = content.replace('@upload()', `http://localhost:${port}/files/${req.files[0].filename}`)
            }
          }

          // func2: 返回用户请求的字段
          const reqKeys = Object.keys(req.body);
          if (reqKeys.length > 0) {
            reqKeys.forEach(key => {
              content = content.replace(`"@request(${key})"`, req.body[key]);
            })
          }

          const obj = JSON.parse(content);

          // func3: 模拟网络延迟
          if (typeof obj['@delay'] === 'number') {
            setTimeout(() => {
              res.send(Mock.mock(obj));
            }, obj['@delay'])
          } else {
            res.send(Mock.mock(obj));
          }
        } catch (e) {
          res.send(content);
        }
      })
    })
  } catch (e) {
    throw e;
  }
}
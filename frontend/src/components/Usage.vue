<template>
  <a-modal title="使用示例" v-model="visible" width="60%" style="top: 20px;">
    <template slot="footer">
      <a-button @click="handleOk">
        关闭
      </a-button>
    </template>

1、ace-mock 支持 Mock.js 语法，如有需要，可以参考：<a href="http://mockjs.com/examples.html">mockjs</a>
<pre>
{
  "list|30": [
    {
      "id": "@guid",
      "title": "@ctitle(10, 20)",
      "date": "@date('yyyy-MM-dd')"
    }
  ]
}
</pre>

2、支持字段回显，语法：@request(field)
<pre>
{
  "code": 200,
  "message": "ok",
  "currentPage": "@request(page)",
  "total": 50,
  "resultList|10": [
    {
      "id": "@guid",
      "title": "@ctitle(10, 20)",
      "date": "@date('yyyy-MM-dd')"
    }
  ]
}
</pre>
假设接口为：POST /test <br />
这时前端请求：curl -X POST -d page=2 http://localhost:12345/test <br />
得到响应结果："currentPage": 2,
<br /><br />
3、支持文件上传，语法：@upload()，示例，上传照片：
<pre>
{
  "status": 200,
  "message": "ok",
  "result": "@upload()"
}
</pre>

前端使用表单上传单张照片后会返回如下结果：
<pre>
{
  "status": 200,
  "message": "ok",
  "result": "http://localhost:12345/files/file-1579452917264.jpg"
}
</pre>

批量上传多张照片后会返回如下结果：
<pre>
{
  "status": 200,
  "message": "ok",
  "result": [
    "http://localhost:12345/files/file-1579452927117.jpg",
    "http://localhost:12345/files/file-1579452927118.jpg",
    "http://localhost:12345/files/file-1579452927125.jpg"
  ],
}
</pre>

4、模拟网络延迟，语法："@delay": 1000，单位：ms
<pre>
{
  "@delay": 1000, 
  "status": 200,
  "message": "ok",
  "result": "@upload()"
}
</pre>
这样在请求该接口后，服务端将会延迟 1000 毫秒才会向前端响应结果。
<br />
<br />

5、模拟接口异常
<pre>
{
  "@status": 400,
}
</pre>


9、GET 方法的接口可以写 HTML

<pre>
{{html}}
</pre>

  </a-modal>
</template>

<script>
export default {
  name: "Usage",
  data() {
    return {
      visible: false,

      html: `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>网页测试</title>
  <style>
    .wrapper {
      display: flex;
      width: 500px;
      height: 300px;
      border: 1px solid #ccc;
    }
    .box {
      flex: auto;
      height: 100px;
    }
    .box1 {
      flex: 2;
      background: blue;
    }
    .box2 {
      background: pink;
    }
    .box3 {
      background: yellow;
    }
  </style>
</head>

<body>
  <div class="wrapper">
    <div class="box box1"></div>
    <div class="box box2"></div>
    <div class="box box3"></div>
  </div>
</body>

</html>
      `
    };
  },
  methods: {
    handleOk() {
      this.visible = false;
    },
  },
};
</script>

<style scoped>
pre {
  background: #f4f4f4;
  border: 1px solid #ddd;
  border-left: 3px solid #f36d33;
  color: #666;
  page-break-inside: avoid;
  font-family: monospace;
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 1.6em;
  max-width: 100%;
  overflow: auto;
  padding: 1em 1.5em;
  display: block;
  word-wrap: break-word;
}
</style>

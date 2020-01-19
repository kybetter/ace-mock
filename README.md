# 一款前端 api mock 工具

POST 方法 API：

![api](./api_bg.jpg)

当设置好 API 后，就可以直接请求了，例如：`curl -X POST http://localhost:12345/test3`。

设置 GET 方法 API 时，可以写 HTML：

![page](./html_bg.jpg)

当设置好 API 后，访问：`http://localhost:12345/page` 就可以看到页面了。

ace-mock 支持 Mock.js 语法，如有需要，可以参考：http://mockjs.com/examples.html

#### 安装
```sh
$ yarn global add ace-mock
# or
$ npm i -g ace-mock
```

#### 使用

```
$ ace-mock [options]
```

#### 示例

```sh
$ ace-mock
# or
$ ace-mock --port=12345
```

执行上述命令后，就会开启 mock 服务，地址为：`http://localhost:12345`

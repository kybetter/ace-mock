const path = require('path');
const fs = require('fs');

/**
 * Create mock.json file and set global.mockFile variable.
 */
exports.createMockFile = () => {
  const mockFile = path.resolve(process.env.HOME, '.ace-mock', 'mock.json');
  const isExist = fs.existsSync(mockFile);

  if (!isExist) {
    if (!fs.existsSync(path.resolve(process.env.HOME, '.ace-mock'))) {
      fs.mkdirSync(path.resolve(process.env.HOME, '.ace-mock'));
    }
    fs.writeFileSync(path.resolve(process.env.HOME, '.ace-mock', 'mock.json'), JSON.stringify({
      globalId: 0,
      normalapi: [
        {
          id: 0,
          name: "/demo",
          method: "POST", 
          content: `{\n  "code": 200,\n  "message": "success",\n  "data": {\n    "userName": "Alice"\n  }\n}\n`
        }
      ]
    }));
  }
  global.mockFile = mockFile;
}

/**
 * Set custom apis when start server and create a new api
 * @param app
 */
exports.setCustomApi = (app) => {
  const mock = require(mockFile);
  const normalapi = mock.normalapi;
  normalapi.forEach(api => {
    app[api.method.toLowerCase()](api.name, (req, res) => {
      res.send(api.content);
    })
  })
}

const path = require('path');
const fs = require('fs');

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
          content: `{\n  "code": 200,\n  "message": "success",\n  "data": {\n    "userName": "Alice",\n  }\n}\n`
        }
      ]
    }));
  }
  global.mockFile = mockFile;
}
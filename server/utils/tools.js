module.exports.checkApiExist = function (req, res) {
  if (
    req.body.apiPath.indexOf('/ace-mock-api') === 0
  ) {
    res.send({
      code: 400,
      message: '不能使用 /ace-mock-api 开头的路径',
    });
    return false;
  }
  return true;
}
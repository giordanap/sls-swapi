const AWS = require("aws-sdk");

const Singleton = (function () {
  let instance;

  return {
    getInstance: function () {
      if (!instance) {
        instance = new AWS.DynamoDB.DocumentClient();
      }

      return instance;
    },
  };
})();

module.exports = {
  Singleton,
};
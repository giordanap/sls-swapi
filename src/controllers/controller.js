const { Singleton } = require("./helpers/connection");

module.exports = class Controller {
  constructor() {
    this.dynamodb = new Singleton.getInstance();
  }

  async insert(TableName, Item) {
    try {
      await this.dynamodb
        .put({
          TableName,
          Item,
        })
        .promise();
    } catch (error) {
      throw error;
    }
  }

  async getAll(TableName) {
    try {
      return await this.dynamodb
        .scan({
          TableName,
        })
        .promise();
    } catch (error) {
      throw error;
    }
  }
};
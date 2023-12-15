const middy = require("@middy/core");
const jsonBodyParser = require("@middy/http-json-body-parser");
const { PersonController } = require("../controllers/people.controller");

const personController = new PersonController();

const getPeople = (event) => personController.getAllPerson();
const addPerson = (event) => personController.postPerson(event);



module.exports = {
  getPeople,
  addPerson: middy(addPerson).use(jsonBodyParser()),
};

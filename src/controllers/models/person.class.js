const { v4: uuid } = require("uuid");
const { Persona } = require("./persona.class");
const { getValue } = require("../functions/swapi");

class Person {
  constructor(
    name,
    gender,
    homeworld,
    films = [],
    species = [],
    vehicles = [],
    starships = []
  ) {
    this.id = uuid();
    this.name = name;
    this.gender = gender;
    this.homeworld = homeworld;
    this.films = films || [];
    this.species = species || [];
    this.vehicles = vehicles || [];
    this.starships = starships || [];
  }

  async convertirPersona() {
    return new Persona(
      this.name,
      this.getGender(this.gender),
      await getValue(this.homeworld, "name"),
      await this.getArray(this.films, "title"),
      await this.getArray(this.species, "name"),
      await this.getArray(this.vehicles, "name"),
      await this.getArray(this.starships, "name")
    );
  }

  async getArray(arr, field) {
    return await Promise.all(
      arr.map(async (e) => {
        return await getValue(e, field);
      })
    );
  }

  getGender(gender) {
    if (gender === "male") return "masculino";
    else if (gender === "female") return "femenino";
    else return gender;
  }
}

module.exports = {
  Person,
};
const Controller = require("./controller");
const { Person } = require("./models/person.class");
const { Persona } = require("./models/persona.class");
const { getPeople } = require("./functions/swapi");
const cts = require("./constants/dydbTables");

class PersonController extends Controller {
  constructor() {
    super();
  }

  async getAllPerson() {
    // Data SWAPI
    const data = await getPeople();
    const peopleApi = await Promise.all(
      data.map(async (p) => {
        const person = new Person(
          p.name,
          p.gender,
          p.homeworld,
          p.films,
          p.species,
          p.vehicles,
          p.starships
        );
        const persona = await person.convertirPersona();
        return persona;
      })
    );
    // Data DynamoDB
    const result = await super.getAll(cts.TABLE);
    const personasApi = result.Items;
    const personas = [...personasApi, ...peopleApi];

    return personas;
  }

  async postPerson(event) {
    const {
      nombre,
      genero,
      origen,
      peliculas,
      especies,
      vehiculos,
      navesEspaciales,
    } = event.body;

    const newPersona = new Persona(
      nombre,
      genero,
      origen,
      peliculas,
      especies,
      vehiculos,
      navesEspaciales
    );

    await super.insert(cts.TABLE, newPersona);

    return {
      status: 200,
      body: JSON.stringify(newPersona),
    };
  }
}

module.exports = {
  PersonController,
};

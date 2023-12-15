const axios = require('axios');
const cts = require("../../src/controllers/constants/url");
const { getPeople } = require('../../src/controllers/functions/swapi');
const { Person } = require('../../src/controllers/models/person.class');
const { Persona } = require('../../src/controllers/models/persona.class');

const getPersonURL = 'https://tyvsupnv1b.execute-api.sa-east-1.amazonaws.com/personas';
const postPersonURL = 'https://tyvsupnv1b.execute-api.sa-east-1.amazonaws.com/personas';

describe('Persona Controller', () => {

    const objectTest = {
        "nombre": "Luke Skywalker",
        "genero": "masculino",
        "origen": "Tatooine",
        "peliculas": [
            "A New Hope",
            "The Empire Strikes Back",
            "Return of the Jedi",
            "Revenge of the Sith",
            "The Force Awakens"
        ],
        "especies": [
            "Human"
        ],
        "vehiculos": [
            "Snowspeeder",
            "Imperial Speeder Bike"
        ],
        "navesEspaciales": [
            "X-wing",
            "Imperial shuttle"
        ]
    };

    const respSwapi = {
        name: 'Luke Skywalker',
        gender: 'male',
        homeworld: 'https://swapi.py4e.com/api/planets/1/',
        films: [
            'https://swapi.py4e.com/api/films/1/',
            'https://swapi.py4e.com/api/films/2/',
            'https://swapi.py4e.com/api/films/3/',
            'https://swapi.py4e.com/api/films/6/',
            'https://swapi.py4e.com/api/films/7/'
        ],
        species: [ 'https://swapi.py4e.com/api/species/1/' ],
        vehicles: [
            'https://swapi.py4e.com/api/vehicles/14/',
            'https://swapi.py4e.com/api/vehicles/30/'
        ],
        starships: [
            'https://swapi.py4e.com/api/starships/12/',
            'https://swapi.py4e.com/api/starships/22/'
        ],
    }

    test('getPerson return status 200', async () => {
        const resp = await axios.get(getPersonURL);
        expect(resp.status).toBe(200);
    });

    test('postPerson return status 200', async () => {
        const resp = await axios.post(postPersonURL, objectTest);
        expect(resp.status).toBe(200);
    });

    test('swapi-url return status 200', async () => {
        const resp = await axios.get(cts.URL);
        expect(resp.status).toBe(200)
    });

    test('getPeople return default values', async() => {
        const people = await getPeople();
        const [ item ] = people.filter(p => p.name.includes('Luke'));

        expect(item).toEqual(expect.objectContaining(respSwapi));
    });

    test('should create Person instance', async () => {
        const { 
            name, gender, homeworld, films,
            species, vehicles, starships
        } = respSwapi;

        const person = (new Person(
            name, gender, homeworld, films,
            species, vehicles, starships
        ));

        expect(person).toBeInstanceOf(Person);
    });

    test('convertirPersona should translate the data', async () => {
        const { 
            name, gender, homeworld, films,
            species, vehicles, starships
        } = respSwapi;

        const person = (new Person(
            name, gender, homeworld, films,
            species, vehicles, starships
        ));

        const persona = await person.convertirPersona();

        expect(persona).toEqual(expect.objectContaining(objectTest));
    });

    test('getPerson should return data translated', async () => {
        const resp = await axios.get(getPersonURL);
        const lukeSkywalker = resp.data.find(p => p.nombre === 'Luke Skywalker');

        expect(lukeSkywalker).toEqual(expect.objectContaining(objectTest));
    });

    test('should create Persona instance', () => {
        const { 
            nombre, genero, origen, peliculas,
            especies, vehiculos, navesEspaciales
        } = objectTest;

        const persona = new Persona({ 
            nombre, genero, origen, peliculas,
            especies, vehiculos, navesEspaciales
        });

        expect(persona).toBeInstanceOf(Persona);
    });
})

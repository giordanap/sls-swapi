const { v4: uuid } = require("uuid");

class Persona {
  constructor(
    nombre,
    genero,
    origen,
    peliculas,
    especies,
    vehiculos,
    navesEspaciales
  ) {
    this.id = uuid();
    this.nombre = nombre;
    this.genero = genero;
    this.origen = origen;
    this.peliculas = peliculas || [];
    this.especies = especies || [];
    this.vehiculos = vehiculos || [];
    this.navesEspaciales = navesEspaciales || [];
  }
}

module.exports = {
  Persona,
};
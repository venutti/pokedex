const LIMITE_POR_PAGINA = 12;

function obtenerKeyPokemon(pokemon) {
  return `pokemon-${pokemon}`;
}

function obtenerKeyPokemones(offset, limit) {
  return `pokemon-${offset}-${limit}`;
}

export function obtenerPokemon(pokemon) {
  if (!pokemon) {
    throw new Error('Se necesita el nombre de un pokemon para cargar la información.');
  }
  const datosPokemon = JSON.parse(localStorage.getItem(obtenerKeyPokemon(pokemon)));
  if (datosPokemon === null) {
    throw new Error(`El pokemón ${pokemon} no existe en el LocalStorage.`);
  }
  return datosPokemon;
}

export function obtenerListaPokemones(offset = 0, limit = LIMITE_POR_PAGINA) {
  const pokemones = JSON.parse(localStorage.getItem(obtenerKeyPokemones(offset, limit)));
  if (pokemones === null) {
    throw new Error(`El listado de pokemones con offset ${offset} y límite ${limit} no fue encontrado.`);
  }
  return pokemones;
}

export function guardarPokemon(pokemon, datosPokemon) {
  if (!pokemon) {
    throw new Error('Se necesita el nombre de un pokemón para cargar la información.');
  }
  if (typeof datosPokemon !== 'object') {
    throw new Error('Los datos del pokemón deben ser del tipo objeto.');
  }
  localStorage.setItem(obtenerKeyPokemon(pokemon), JSON.stringify(datosPokemon));
}

export function guardarListaPokemones(offset, limit, listaPokemones) {
  if (!offset || !limit) {
    throw new Error('Se necesitan un offset y un límite para guardar la lista de pokemones.');
  }
  if (typeof listaPokemones !== 'object') {
    throw new Error('La lista de pokemones debe ser del tipo objeto.');
  }
  localStorage.setItem(obtenerKeyPokemones(offset, limit), JSON.stringify(listaPokemones));
}

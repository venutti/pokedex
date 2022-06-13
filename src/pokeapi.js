export async function obtenerPokemon(pokemon) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((response) => response.json());
}

export async function obtenerListaPokemones(offset = 0, limit = 12) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
    .then((response) => response.json());
}

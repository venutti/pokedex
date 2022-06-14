const LIMITE_POR_PAGINA = 12;

export async function obtenerPokemon(pokemon) {
  return (await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)).json();
}

export async function obtenerListaPokemones(offset = 0, limit = LIMITE_POR_PAGINA) {
  return (await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)).json();
}

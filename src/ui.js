/* eslint-disable import/extensions */
/* eslint-disable import/no-relative-packages */
import { desformatearTitular, obtenerParametrosDeURL } from './utilidades.js';
import { configurarModalPokemon, configurarPlaceholderModalPokemon } from './modal.js';
import { inicializarPaginacion, configurarPaginacion } from './paginacion.js';
import { inicializarBotonera, configurarPlaceholderBotoneraPokemon, configurarBotoneraPokemon } from './botonera.js';
import { obtenerListaPokemones, obtenerPokemon } from './pokeapi.js';

const modalPokemon = new bootstrap.Modal(document.querySelector('#modal-info-pokemon'));

async function cargarPagina(url) {
  const parametros = obtenerParametrosDeURL(url);
  configurarPlaceholderBotoneraPokemon();

  const listaPokemon = await obtenerListaPokemones(parametros.offset, parametros.limit);
  configurarBotoneraPokemon(listaPokemon.results);
  configurarPaginacion(
    parametros.offset,
    parametros.limit,
    listaPokemon.previous,
    listaPokemon.next,
  );
}

async function mostrarPokemon($pokemonSeleccionado) {
  configurarPlaceholderModalPokemon();
  modalPokemon.show();
  if ($pokemonSeleccionado.textContent === '...') return;
  const infoPokemon = await obtenerPokemon(desformatearTitular($pokemonSeleccionado.textContent));
  configurarModalPokemon(infoPokemon);
}

export default function inicializar() {
  inicializarPaginacion(cargarPagina);
  inicializarBotonera(mostrarPokemon);
  cargarPagina('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=12');
}

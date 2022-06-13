import {
  formatearATitular, convertirHgAKgs, convertirDmAMts,
} from './utilidades';

import {
  cambiarTituloModal,
  cambiarImgModal,
  agregarTiposModal,
  cambiarPesoModal,
  cambiarAlturaModal,
  cambiarStatsModal,
} from './modal';

import { obtenerListaPokemones } from './pokeapi';

let offset = 0;
const limit = 12;

let paginaAnterior = null;
let paginaActual = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=12';
let paginaSiguiente = null;

export function displayPlaceholderModalPokemon() {
  cambiarTituloModal('Unknown', 0);
  cambiarImgModal('');
  agregarTiposModal(['unknown']);
  cambiarPesoModal('---');
  cambiarAlturaModal('---');
  const stats = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
  stats.forEach((stat) => { cambiarStatsModal(stat, 0); });
}

export function mostrarCambiosModal(datosPokemon) {
  cambiarTituloModal(`${formatearATitular(datosPokemon.name)} N°${String(datosPokemon.id).padStart(3, '0')}`);
  cambiarImgModal(datosPokemon.sprites.other['official-artwork'].front_default);
  const tiposPokemon = [];
  datosPokemon.types.forEach((type) => {
    tiposPokemon.push(type.type.name);
  });
  agregarTiposModal(tiposPokemon);
  cambiarPesoModal(String(convertirHgAKgs(tiposPokemon.weight)));
  cambiarAlturaModal(String(convertirDmAMts(tiposPokemon.height)));
  datosPokemon.stats.forEach((stat) => {
    cambiarStatsModal(stat.stat.name, stat.base_stat);
  });
}

function configurarPaginacion() {
  const $paginaciones = document.querySelectorAll('.pagination');
  $paginaciones.forEach(($paginacion) => {
    if (paginaAnterior) {
      $paginacion.querySelector('.anterior').classList.remove('disabled');
    } else {
      $paginacion.querySelector('.anterior').classList.add('disabled');
    }
    if (paginaSiguiente) {
      $paginacion.querySelector('.siguiente').classList.remove('disabled');
    } else {
      $paginacion.querySelector('.siguiente').classList.add('disabled');
    }
  });
}

function modificarIndicePagina() {
  document.querySelectorAll('.pagination .marcador-pagina span').forEach((marcador) => {
    marcador.textContent = `${offset + 1}-${offset + limit}`;
  });
}

function modificarBotonesPokemon(listaPokemon) {
  const $botonesPokemon = document.querySelector('#botones-pokemon').querySelectorAll('button');
  listaPokemon.forEach((pokemon, index) => {
    $botonesPokemon[index].textContent = formatearATitular(pokemon.name);
  });
}

export function displayPlaceholderListaPokemones() {
  document.querySelector('#botones-pokemon').querySelectorAll('button').forEach((boton) => {
    boton.textContent = '...';
  });
  document.querySelectorAll('.pagination .marcador-pagina span').forEach((marcador) => {
    marcador.textContent = '...';
  });
}

export async function cargarPaginaActual() {
  displayPlaceholderListaPokemones();
  const listaPokemones = await obtenerListaPokemones(paginaActual);
  modificarIndicePagina();
  paginaAnterior = listaPokemones.previous;
  paginaSiguiente = listaPokemones.next;
  configurarPaginacion();
  modificarBotonesPokemon();
}

export function cargarPaginaAnterior() {
  paginaActual = paginaAnterior;
  offset -= limit;
  cargarPaginaActual();
}

export function cargarPaginaSiguiente() {
  paginaActual = paginaSiguiente;
  offset += limit;
  cargarPaginaActual();
}

export function inicializarBotonera(callbackSeleccionPokemon) {
  document.querySelector('#botones-pokemon').onclick = (event) => {
    const $elemento = event.target;
    if ($elemento.classList.contains('btn')) {
      displayPlaceholderModalPokemon();
      callbackSeleccionPokemon($elemento);
    }
  };
}

export function inicializarPaginacion() {
  const $paginaciones = document.querySelectorAll('.pagination');
  $paginaciones.forEach(($paginacion) => {
    $paginacion.querySelector('.anterior button').onclick = cargarPaginaAnterior;
    $paginacion.querySelector('.siguiente button').onclick = cargarPaginaSiguiente;
  });
}

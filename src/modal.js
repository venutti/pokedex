/* eslint-disable import/extensions */
import {
  removerHijos,
  agregarTipoPokemon,
  formatearATitular,
  convertirHgAKgs,
  convertirDmAMts,
} from './utilidades.js';

const $modalInfoPokemon = document.querySelector('#modal-info-pokemon');
const MAX_BASE_STAT = 255;

function cambiarTituloModal(nuevoTitulo) {
  // Recibe string y number
  $modalInfoPokemon.querySelector('.modal-title').textContent = nuevoTitulo;
}

function cambiarImgModal(rutaImg) {
  // Recibe string
  $modalInfoPokemon.querySelector('.modal-body img').src = rutaImg;
}

function agregarTiposModal(arrayTipos = ['undefined']) {
  // Recibe array de strings
  const $tiposPokemon = $modalInfoPokemon.querySelector('.modal-body #tipo-pokemon');
  removerHijos($tiposPokemon);
  arrayTipos.forEach((tipo) => {
    agregarTipoPokemon($tiposPokemon, tipo);
  });
}

function cambiarPesoModal(peso) {
  // Recibe string
  $modalInfoPokemon.querySelector('.modal-body #peso-pokemon').textContent = `${peso}kg`;
}

function cambiarAlturaModal(altura) {
  // Recibe string
  $modalInfoPokemon.querySelector('.modal-body #altura-pokemon').textContent = `${altura}mts`;
}

function cambiarStatsModal(stat, valor) {
  // Recibe string y number
  const $stat = $modalInfoPokemon.querySelector(`.modal-body #${stat}`);
  $stat.querySelector('.progress-bar').style.width = `${(valor / MAX_BASE_STAT) * 100}%`;
}

export function configurarModalPokemon(datosPokemon) {
  /* Recibe los datos de un pokemon en formato JSON (como lo descrito en la API de pokemon)
  Y en base a eso, modifica la informacion del MODAL con los datos del pokemon */
  cambiarTituloModal(`${formatearATitular(datosPokemon.name)} N°${String(datosPokemon.id).padStart(3, '0')}`);
  cambiarImgModal(datosPokemon.sprites.other['official-artwork'].front_default);
  const tiposPokemon = [];
  datosPokemon.types.forEach((type) => {
    tiposPokemon.push(type.type.name);
  });
  agregarTiposModal(tiposPokemon);
  cambiarPesoModal(String(convertirHgAKgs(datosPokemon.weight)));
  cambiarAlturaModal(String(convertirDmAMts(datosPokemon.height)));
  datosPokemon.stats.forEach((stat) => {
    cambiarStatsModal(stat.stat.name, stat.base_stat);
  });
}

export function configurarPlaceholderModalPokemon() {
  cambiarTituloModal('Unknown', 0);
  cambiarImgModal('');
  agregarTiposModal(['unknown']);
  cambiarPesoModal('---');
  cambiarAlturaModal('---');
  const stats = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
  stats.forEach((stat) => { cambiarStatsModal(stat, 0); });
}
/*
export async function configurarInfoModal(pokemon) {
  const pokemon = await obtenerPokemon(pokemon);
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((response) => response.json())
    .then((response) => {
      cambiarTituloModal(formatearATitular(response.name), response.id);
      cambiarImgModal(response.sprites.other['official-artwork'].front_default);
      const tiposPokemon = [];
      response.types.forEach((type) => {
        tiposPokemon.push(type.type.name);
      });
      agregarTiposModal(tiposPokemon);
      cambiarPesoModal(String(convertirHgAKgs(response.weight)));
      cambiarAlturaModal(String(convertirDmAMts(response.height)));
      response.stats.forEach((stat) => {
        cambiarStatsModal(stat.stat.name, stat.base_stat);
      });
    })
    .catch((error) => { console.log('Se falló fuerte :c', error); });
}
*/

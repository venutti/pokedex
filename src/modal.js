import {
  removerHijos,
  agregarTipoPokemon,
} from './utilidades';

const $modalInfoPokemon = document.querySelector('#modal-info-pokemon');
const MAX_BASE_STAT = 255;

export function cambiarTituloModal($modal, nuevoTitulo) {
  // Recibe string y number
  $modal.querySelector('.modal-title').textContent = nuevoTitulo;
}

export function cambiarImgModal(rutaImg) {
  // Recibe string
  $modalInfoPokemon.querySelector('.modal-body img').src = rutaImg;
}

export function agregarTiposModal(arrayTipos = ['undefined']) {
  // Recibe array de strings
  const $tiposPokemon = $modalInfoPokemon.querySelector('.modal-body #tipo-pokemon');
  removerHijos($tiposPokemon);
  arrayTipos.forEach((tipo) => {
    agregarTipoPokemon($tiposPokemon, tipo);
  });
}

export function cambiarPesoModal(peso) {
  // Recibe string
  $modalInfoPokemon.querySelector('.modal-body #peso-pokemon').textContent = `${peso}kg`;
}

export function cambiarAlturaModal(altura) {
  // Recibe string
  $modalInfoPokemon.querySelector('.modal-body #altura-pokemon').textContent = `${altura}mts`;
}

export function cambiarStatsModal(stat, valor) {
  // Recibe string y number
  const $stat = $modalInfoPokemon.querySelector(`.modal-body #${stat}`);
  $stat.querySelector('.progress-bar').style.width = `${(valor / MAX_BASE_STAT) * 100}%`;
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

import { Modal } from 'bootstrap';
import { obtenerPokemon } from './pokeapi';
import { desformatearTitular } from './utilidades';
import {
  inicializarBotonera,
  inicializarPaginacion,
  displayPlaceholderModalPokemon,
  mostrarCambiosModal,
} from './ui';

window.bootstrap = require('bootstrap');

const modalBoots = new Modal(document.querySelector('#modal-info-pokemon'));

async function actualizarModal($pokemonSeleccionado) {
  displayPlaceholderModalPokemon();
  modalBoots.show();
  const infoPokemon = await obtenerPokemon(desformatearTitular($pokemonSeleccionado.textContent));
  mostrarCambiosModal(infoPokemon);
}

async function inicializar() {
  // meto placeholders a todo
  // inicializo los botones con sus funciones onclick
  inicializarPaginacion();
  inicializarBotonera(actualizarModal);
}

inicializar();

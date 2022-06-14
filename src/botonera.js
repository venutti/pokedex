/* eslint-disable import/extensions */
import { formatearATitular } from './utilidades.js';

const $botoneraPokemon = document.querySelector('#botones-pokemon');

export function configurarPlaceholderBotoneraPokemon() {
  $botoneraPokemon.querySelectorAll('button').forEach((boton) => {
    boton.textContent = '...';
  });
}

export function inicializarBotonera(callbackSeleccionPokemon) {
  $botoneraPokemon.onclick = (event) => {
    const $elemento = event.target;
    if ($elemento.classList.contains('btn')) {
      callbackSeleccionPokemon($elemento);
    }
  };
}

export function configurarBotoneraPokemon(listaPokemon) {
  const botonesPokemon = $botoneraPokemon.querySelectorAll('button');
  listaPokemon.forEach((pokemon, index) => {
    botonesPokemon[index].textContent = formatearATitular(pokemon.name);
  });
}

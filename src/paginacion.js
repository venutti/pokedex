export function displayPlaceholderListaPokemones() {
  document.querySelector('#botones-pokemon').querySelectorAll('button').forEach((boton) => {
    boton.textContent = '...';
  });
  document.querySelectorAll('.pagination .marcador-pagina span').forEach((marcador) => {
    marcador.textContent = '...';
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

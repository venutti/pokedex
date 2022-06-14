const $paginaciones = document.querySelectorAll('.pagination');
const LIMITE_POR_PAGINA = 12;

function modificarIndicePagina(offset = 0, limit = LIMITE_POR_PAGINA) {
  document.querySelectorAll('.pagination .marcador-pagina span').forEach((marcador) => {
    marcador.textContent = `${offset + 1}-${offset + limit}`;
  });
}

export function configurarPaginacion(
  offset,
  limit,
  urlAnterior,
  urlSiguiente,
) {
  /* Carga los data-atributes de los botones ANTERIOR y SIGUIENTE,
  con respecto a las url pasadas por parametro */
  modificarIndicePagina(Number(offset), Number(limit));

  $paginaciones.forEach(($paginacion) => {
    const $botonAnterior = $paginacion.querySelector('.anterior');
    $botonAnterior.dataset.url = urlAnterior;
    if (urlAnterior) {
      $botonAnterior.classList.remove('disabled');
    } else {
      $botonAnterior.classList.add('disabled');
    }
    const $botonSiguiente = $paginacion.querySelector('.siguiente');
    $botonSiguiente.dataset.url = urlSiguiente;
    if (urlSiguiente) {
      $botonSiguiente.classList.remove('disabled');
    } else {
      $botonSiguiente.classList.add('disabled');
    }
  });
}

export function inicializarPaginacion(callbackSeleccionPagina) {
  /* Hace que cada paginacion responda a un evento onclick,
  pasando la url del target como parametro del callbackSeleccionPagina */
  $paginaciones.forEach(($paginacion) => {
    $paginacion.querySelector('.anterior').onclick = function () {
      callbackSeleccionPagina(this.dataset.url);
    };
    $paginacion.querySelector('.siguiente').onclick = function () {
      callbackSeleccionPagina(this.dataset.url);
    };
  });
}

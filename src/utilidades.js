export function capitalizarPrimerLetra(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function descapitalizarPrimeraLetra(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

export function formatearATitular(string) {
  return capitalizarPrimerLetra(string.replaceAll('-', ' '));
}

export function desformatearTitular(string) {
  return descapitalizarPrimeraLetra(string.replaceAll(' ', '-'));
}

export function convertirDmAMts(decimetros) {
  return decimetros / 10;
}

export function convertirHgAKgs(hectogramos) {
  return hectogramos / 10;
}

export function removerHijos($elementoPadre, selectorHijo = undefined) {
  if (!selectorHijo) {
    $elementoPadre.innerHTML = '';
  } else {
    $elementoPadre.querySelectorAll(selectorHijo).forEach((hijo) => {
      hijo.remove();
    });
  }
}

export function agregarTipoPokemon($elementoPadre, tipoPokemon) {
  const $span = document.createElement('span');
  $span.classList.add('tipo');
  $span.classList.add(`${tipoPokemon}-type`);
  $span.textContent = tipoPokemon === 'unknown' ? '???' : tipoPokemon.toUpperCase();
  $elementoPadre.appendChild($span);
}

export function obtenerParametrosDeURL(url) {
  let offset;
  let limit;
  try {
    offset = /offset=([0-9]+)/gi.exec(url).pop();
    limit = /limit=([0-9]+)/gi.exec(url).pop();
  } catch (e) {
    offset = undefined;
    limit = undefined;
  }
  return { offset, limit };
}

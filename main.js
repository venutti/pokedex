const $botonesPokemon = document.querySelector("#botones-pokemon");
const $modalInfoPokemon = document.querySelector("#modal-info-pokemon");
const modalElement = new bootstrap.Modal($modalInfoPokemon);

const MAX_BASE_STAT = 255;

$botonesPokemon.onclick = function(event){
    const $elemento = event.target
    if($elemento.classList.contains("btn")){
        modalElement.show();
    }
}

/*Funciones GENERALISIMAS*/

function capitalizarPrimerLetra(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function convertirDmAMts(decimetros) {
    return decimetros / 10;
}

function convertirHgAKgs(hectogramos) {
    return hectogramos / 10;
}

/*Funciones del DOM*/

function removerHijos($elementoPadre, selectorElementoHijo) {
    //Recibe elementoDOM y string
    $elementoPadre.querySelectorAll(selectorElementoHijo).forEach(hijo => {
        hijo.remove();
    })
}

function agregarTipoPokemon($elementoPadre, tipo) {
    //Recibe elementoDOM y string
    const $span = document.createElement("span");
    $span.classList.add("tipo");
    $span.classList.add(`${tipo}-type`);
    $span.textContent = tipo === "unknown" ? "???" : tipo.toUpperCase();
    $elementoPadre.appendChild($span);
}


/*Funciones del MODAL*/

function cambiarTituloModal(nombrePokemon, numPokemon) {
    //Recibe string y number
    nombrePokemon = capitalizarPrimerLetra(nombrePokemon);
    numPokemon = String(numPokemon).padStart(3, "0");
    const $tituloModal = $modalInfoPokemon.querySelector(".modal-title");
    $tituloModal.textContent = `${nombrePokemon} N°${numPokemon}`;
}

function cambiarImgModal(rutaImg) {
    //Recibe string
    const $imgPokemon = $modalInfoPokemon.querySelector(".modal-body img");
    $imgPokemon.src = rutaImg;
}

function agregarTiposModal(arrayTipos) {
    //Recibe array de strings
    const $tiposPokemon = $modalInfoPokemon.querySelector(".modal-body #tipo-pokemon");
    removerHijos($tiposPokemon, "span");
    arrayTipos.forEach(tipo => {
        agregarTipoPokemon($tiposPokemon, tipo);
    })
}

function cambiarPesoModal(peso) {
    // Recibe string
    const $peso = $modalInfoPokemon.querySelector(".modal-body #peso-pokemon");
    $peso.textContent = `${peso}kg`;
}

function cambiarAlturaModal(altura) {
    // Recibe string
    const $altura = $modalInfoPokemon.querySelector(".modal-body #altura-pokemon");
    $altura.textContent = `${altura}mts`;
}

function cambiarStatsModal(stat, valor) {
    // Recibe string y number
    const $stat = $modalInfoPokemon.querySelector(`.modal-body #${stat}`);
    $stat.querySelector(".progress-bar").style.width = `${valor/MAX_BASE_STAT * 100}%`;
}

function displayPlaceholderPokemones() {
    $botonesPokemon.querySelectorAll("button").forEach(boton => {
        boton.textContent = "Cargando...";
    })
}

function displayPlaceholderModalPokemon() {
    cambiarTituloModal("Ditto", 0);
    cambiarImgModal("resources/ditto.png");
    agregarTiposModal(["normal"]);
    cambiarPesoModal("12.7");
    cambiarAlturaModal("0.4");
    const stats = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"];
    stats.forEach(stat => {cambiarStatsModal(stat, 55)});
}

displayPlaceholderPokemones();

displayPlaceholderModalPokemon();

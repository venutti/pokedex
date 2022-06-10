const $botonesPokemon = document.querySelector("#botones-pokemon");
const $modalInfoPokemon = document.querySelector("#modal-info-pokemon");
const modalElement = new bootstrap.Modal($modalInfoPokemon);

const MAX_BASE_STAT = 255;
let offset = 0;
let limit = 12;
let paginaAnterior = null;
let paginaActual = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=12";
let paginaSiguiente = null;

/*Funciones GENERALISIMAS*/

function capitalizarPrimerLetra(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function descapitalizarPrimeraLetra(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

function formatearATitular(string) {
    return capitalizarPrimerLetra(string.replaceAll("-", " "));
}

function desformatearTitular(string) {
    return descapitalizarPrimeraLetra(string.replaceAll(" ", "-"));
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

/*Funciones de la interfaz principal*/

function configurarPaginacion() {
    const $paginaciones = document.querySelectorAll(".pagination");
    $paginaciones.forEach($paginacion => {
        if(paginaAnterior){
            $paginacion.querySelector(".anterior").classList.remove("disabled");
        }else{
            $paginacion.querySelector(".anterior").classList.add("disabled");
        }
        if(paginaSiguiente){
            $paginacion.querySelector(".siguiente").classList.remove("disabled");
        }else{
            $paginacion.querySelector(".siguiente").classList.add("disabled");
        }
    })
}

function cargarPaginaActual() {
    fetch(paginaActual)
        .then(response => response.json())
        .then(response => {
            modificarIndicePagina();
            paginaAnterior = response["previous"];
            paginaSiguiente = response["next"];
            configurarPaginacion();
            const arrayBotones = $botonesPokemon.querySelectorAll("button");
            response["results"].forEach((pokemon, index) => {
                arrayBotones[index].textContent = formatearATitular(pokemon["name"]);
            })
        })
        .catch(error => {console.log("Uups", error)});
}

function cargarPaginaAnterior() {
    paginaActual = paginaAnterior;
    offset -= limit;
    cargarPaginaActual();
}

function cargarPaginaSiguiente() {
    paginaActual = paginaSiguiente;
    offset += limit;
    cargarPaginaActual();
}

function modificarIndicePagina() {
    document.querySelectorAll(".pagination .marcador-pagina span").forEach(marcador => {
        marcador.textContent = `${offset+1}-${offset+limit}`;
    })
}

/*Funciones del MODAL*/

function configurarInfoModal(pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(response => response.json())
        .then(response => {
            cambiarTituloModal(formatearATitular(response["name"]), response["id"]);
            cambiarImgModal(response["sprites"]["other"]["official-artwork"]["front_default"]);
            const tiposPokemon = [];
            response["types"].forEach(type => {
                tiposPokemon.push(type["type"]["name"]);
            })
            agregarTiposModal(tiposPokemon);
            cambiarPesoModal(String(convertirHgAKgs(response["weight"])));
            cambiarAlturaModal(String(convertirDmAMts(response["height"])));
            response["stats"].forEach(stat => {
                cambiarStatsModal(stat["stat"]["name"], stat["base_stat"]);
            })
        })
        .catch(error => {console.log("Se falló fuerte :c", error)});
}

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

/*Funciones para trabajar con la API de Pokemon*/


/*Asignacion de eventos a los botones*/

function asignarEventosPaginacion() {
    const $paginaciones = document.querySelectorAll(".pagination");
    $paginaciones.forEach($paginacion => {
        $paginacion.querySelector(".anterior button").onclick = cargarPaginaAnterior;
        $paginacion.querySelector(".siguiente button").onclick = cargarPaginaSiguiente;
    })
}

$botonesPokemon.onclick = function(event){
    const $elemento = event.target
    if($elemento.classList.contains("btn")){
        displayPlaceholderModalPokemon();
        configurarInfoModal(desformatearTitular($elemento.textContent));
        modalElement.show();
    }
}

function displayPlaceholderPokemones() {
    $botonesPokemon.querySelectorAll("button").forEach(boton => {
        boton.textContent = "Cargando...";
    })
}

function displayPlaceholderModalPokemon() {
    cambiarTituloModal("Unknown", 0);
    cambiarImgModal("");
    agregarTiposModal(["unknown"]);
    cambiarPesoModal("---");
    cambiarAlturaModal("---");
    const stats = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"];
    stats.forEach(stat => {cambiarStatsModal(stat, 0)});
}

displayPlaceholderPokemones();

displayPlaceholderModalPokemon();

cargarPaginaActual();

asignarEventosPaginacion();

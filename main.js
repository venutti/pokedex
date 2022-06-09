const $botonesPokemon = document.querySelector("#botones-pokemon");
const $modalInfoPokemon = new bootstrap.Modal(document.querySelector("#modal-info-pokemon"));

$botonesPokemon.onclick = function(event){
    console.log("Click");
    $modalInfoPokemon.show();
}
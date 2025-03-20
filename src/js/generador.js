import { getApi } from './api.js';

async function generarPokemonAleatorio() {
    let datos;
    while (datos == undefined) {
        const idPokemon = Math.floor(Math.random()*1024+1);
        console.log("intentando generar pokemon... "+idPokemon)
        datos = await getApi(idPokemon);
    }
    
    // la idea es que devuelva un array
    return datos;
}

async function pintarPokemons() {

    for (let i = 1; i<=3; i++) {
        // debemos coger un pokemon random y ponerlo para seleccionar
        const pokemon = await generarPokemonAleatorio();

        // una vez generado vamos a pintarlo en la primera capsula
        const capsula = document.querySelector('#pokemon-'+i);
        const img = document.createElement("img");
        img.setAttribute("src", pokemon["sprites"]["front_default"]);
        img.setAttribute("class", "img-thumbnail rounded pointer");
        img.setAttribute("id", "pokemon-img-"+i);

        const name = document.createElement("figcaption");
        name.setAttribute("class", "figure-caption text-center");
        name.setAttribute("id", "pokemon-name-"+i);
        name.innerHTML = pokemon["name"]+" #"+pokemon["id"];

        capsula.appendChild(img);
        capsula.appendChild(name);
    }
    
}

export function generar() {
    pintarPokemons();
    return 1;
}
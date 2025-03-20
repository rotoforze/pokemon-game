// esta es la clase principal donde vamos a ir llamando al resto de
// scripts.

// generamos los 3 pokemons
import { generar } from './generador.js';
generar();

// buscamos cual está clickando el usuario
import { seleccionar } from './selector.js';
let pokemonSeleccionado;

function seleccionarPokemon(pokemon) {
    // me devuelve el id del pokemon seleccionado
    pokemonSeleccionado = seleccionar(pokemon);
}

// apartado para la batalla
import { cargarBatalla } from './batalla.js';

function toBatalla(pokemon) {
    cargarBatalla(pokemon);
}



// esta función exclusivamente aplica los botones para la selección del pokemon
function aplicarBotonesSelectores() {
    for (let i = 1; i<=3; i++) {
        const divActual = document.querySelector("#pokemon-"+i);
        divActual.addEventListener("click", () => seleccionarPokemon(i))
    }
}
aplicarBotonesSelectores();

const btnSeleccion = document.querySelector(".aceptar");
btnSeleccion.addEventListener("click", () => toBatalla(pokemonSeleccionado))
// fin de la parte que aplica funciones para clickeables
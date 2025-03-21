import { cargarBatalla } from "./batalla.js";

const pokemonUsuario = document.querySelector(".nombreUsuario");

export function intentarHuir() {
    const numero = Math.floor((Math.random()*8)+1);
    console.log("huir.intentarHuir: porb "+numero);

    if (numero == 1) {
        // rerollear enemigo + un item random
        cargarBatalla(pokemonUsuario.innerHTML, true);
        return true
    }else{
        // te comes un ataque
        return false
    }
}
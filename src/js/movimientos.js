const botones = [
    document.querySelector(".primer-movimiento"),
    document.querySelector(".segundo-movimiento"),
    document.querySelector(".tercer-movimiento"),
    document.querySelector(".cuarto-movimiento")
];

const ataques = new Map([
    ["placaje", 40],
    ["gruñido", 0],
    ["absorber", 10],
    ["malicioso", 0]
]);
const ataquesArray = Array.from(ataques);

import { ataque } from "./menu_comandos.js";

export function establecerMovimientos() {
    let i = 0;
    for (const x of ataques.keys()){
        botones[i].innerHTML = x;
        botones[i].addEventListener("click", () => { ataque(x) }, true)
        i++;
    }
}

export function getAtaque(ataque) {
    
    let ataqueDevolver;
    if (typeof ataque === 'number') {
        ataqueDevolver = ataquesArray[ataque] ? ataquesArray[ataque][0] : ataquesArray[0][0];
    }else {
        ataqueDevolver = ataques.get(ataque);
    }
    
    console.log("movimientos.getAtaque: recibido: "+ataque+" | devolviendo: "+ataqueDevolver);
    return ataqueDevolver;
}
const contenedorItems = document.querySelector(".contenedor-objetos");

let mochila = [];

let listaObjetos = [
    // array con todos los items

    /*  MAPA 
     *      CURACIONES
     *  poción == [0][0][0] --> [0][0][1] == 20
     *  Refresco == [0][1][0] --> [0][1][1] == 50
     *  Curar Total == [0][2][0] --> [0][2][1] == maxHP
     * 
     *      + ATK
     *  Proteína == [1][0][0] --> [1][0][1] == 20
     *  Ataque X == [1][1][0] --> [1][1][1] == 50
     * 
     *      + DEF
     *  Hierro == [2][0][0] --> [2][0][1] == 20
     *  Defensa X == [2][1][0] --> [2][1][1] == 50
     *  
    */
    [
        // curación
        ["Poción", 20],         // id 1
        ["Refresco", 50],       // id 2
        ["Curar Total", 500]    // id 3
    ],
    [
        // más ataque
        ["Proteína", 20],       // id 4
        ["Ataque X", 50],       // id 5
        ["", 0]                 // id 
    ], 
    [
        // más DEF
        ["Hierro", 20],         // id 6
        ["Defensa X", 50],      // id 7
        ["", 0]            // id 
    ],
];

export function getDesdeId(numero) {
    switch (numero) {
        case 1:
            return "Poción";
        case 2:
            return "Refresco";
        case 3:
            return "Curar Total";
        case 4:
            return "Proteína";
        case 5:
            return "Ataque X";
        case 6:
            return "Hierro";
        case 7:
            return "Defensa X";
        default: 
            return null;
    }
}

import { addUsuarioHp } from "./batalla.js";
import { addUsuarioAtk } from "./batalla.js";

function usarCuracion(tipo) {
    // cura cantidad
    console.log("mochila.usarCuracion: "+tipo);

    const cantidad = getStatItem(tipo);
    addUsuarioHp(cantidad);

}

function usarMasAtk(tipo) {
    // añade atk 
    console.log("mochila.usarMasAtk: "+tipo);
    
    const cantidad = getStatItem(tipo);
    addUsuarioAtk(cantidad);
}

function usar() {
    
    if (this != undefined) {
        console.log("mochila.usar: buscando item");
        if (this.innerHTML == 'Poción' || this.innerHTML == 'Refresco' || this.innerHTML == 'Curar Total'){
            usarCuracion(this.innerHTML);
        }else if(this.innerHTML == 'Proteína' || this.innerHTML == 'Ataque X') {
            usarMasAtk(this.innerHTML);
        }else if(this.innerHTML == 'Hierro' || this.innerHTML == 'Defensa X') {
       
        }
        this.remove();
    }

    const textoVacio = "Mochila vacía...";
    if (contenedorItems.firstChild == undefined) {
        console.log("mochila.usar: poniendo texto mochila vacía");
        const texto = document.createElement("li");
        texto.innerHTML = textoVacio;
        texto.setAttribute("class", "texto-mochila-vacia texto");
        contenedorItems.appendChild(texto);

    }else if(contenedorItems.firstChild.innerHTML == textoVacio){
        console.log("mochila.usar: quitando texto mochila vacía");
        const texto = document.querySelector(".texto-mochila-vacia");
        texto.remove();
    }
}

export function aniadirItemsAMochila(nombre) {

    console.log("mochila.aniadirItemsAMochila: intentando añadir item "+nombre);

    // comprobamos si existe en la lista, además lo añadimos a la mochila
    if (getStatItem(nombre) != 0) {
        
        mochila.push(nombre);
        const itemToAdd = document.createElement("li");
        itemToAdd.innerHTML = nombre;
        itemToAdd.setAttribute("class", "btn btn-info");
        itemToAdd.setAttribute("style", "margin-left: 3px;height:30%;");
        itemToAdd.addEventListener("click", usar);
        contenedorItems.appendChild(itemToAdd);
        usar();

    }else console.log("mochila.aniadirItemsAMochila: no se ha encontrado "+nombre+" en la lista")


    console.log("mochila.aniadirItemsAMochila: Añadido nuevo item: "+nombre);

}

export function getStatItem(nombreItem) {

    let valorRetorno = 0;

    for (let i = 0; i<3 && valorRetorno === 0; i++){
        for(let j = 0; j<3 && valorRetorno === 0; j++) {
            //console.log("mochila.getStatItem: "+listaObjetos[i][j][0])
            if (listaObjetos[i][j][0] === nombreItem) {
                valorRetorno = listaObjetos[i][j][1];
            }
        }
    }

    return valorRetorno;
}
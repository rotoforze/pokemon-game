const claseTexto = ".texto";
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
        ["Poción", 20], 
        ["Refresco", 50],
        ["Curar Total", "maxHP"] 
    ],
    [
        // más ataque
        ["Proteína", 20],
        ["Ataque X", 50],
        ["", 0]
    ],
    [
        // más DEF
        ["Hierro", 20],
        ["Defensa X", 50],
        [null, null]
    ],
];

export function aniadirItemsAMochila(nombre) {

    console.log("mochila.aniadirItemsAMochila: intentando añadir item "+nombre);

    // comprobamos si existe en la lista, además lo añadimos a la mochila
    if (getStatItem(nombre) != 0) {
        
        mochila.push(nombre);
    }else console.log("mochila.aniadirItemsAMochila: no se ha encontrado "+nombre+" en la lista")

    const itemToAdd = document.createElement("li");
    itemToAdd.innerHTML = nombre;
    itemToAdd.setAttribute("class", "texto");
    contenedorItems.appendChild(itemToAdd);

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
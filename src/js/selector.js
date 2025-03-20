function factorizarImagenes(seleccion) {
    for (let i = 1; i<=3; i++) {
        const pokemon = document.getElementById("pokemon-img-"+i);
        pokemon.style.background = "white";   
        pokemon.setAttribute("class", "img-thumbnail rounded pointer");
    }

    const pokemonSeleccionado = document.getElementById("pokemon-img-"+seleccion);
    pokemonSeleccionado.style.backgroundImage = "radial-gradient(#afafaf, #aaafff, #00bbbf)";
    pokemonSeleccionado.setAttribute("class", "img-thumbnail rounded");
    // pokemonSeleccionado.border = "thick afafaf auto";
}

export function seleccionar(seleccion) {
    // tenemos que coger el numero del que clicke el usuario

    let flag = false;
    let id;
    const nombrePokemon = document.querySelector("#pokemon-name-"+seleccion);
    const pokemon = document.getElementById("pokemon-"+seleccion).style;

    let i = 1;
    while (!flag) {
        // recorremos el string a la inversa hasta encontrar el #
        if (nombrePokemon.innerHTML.charAt(nombrePokemon.innerHTML.length-i) == "#" || i==5) {
            flag = true;
        }else {
            if (id === undefined) {
                id = nombrePokemon.innerHTML.charAt(nombrePokemon.innerHTML.length-i);
            }else {
                id = (nombrePokemon.innerHTML.charAt(nombrePokemon.innerHTML.length-i))+id;
            }
        }

        i++;
    }

    factorizarImagenes(seleccion);

    console.log("pokemon seleccionado: "+id)
    return id;
}
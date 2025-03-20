const menu = document.querySelector(".comandos");
const contenedorTexto = document.querySelector('#contenedor-texto');
const salidaTexto = document.querySelector(".salidaTexto");
const botones = document.querySelector('.botones-comandos');
const btnAtacar = document.querySelector(".atacar");
const btnMochila = document.querySelector(".mochila");
const btnHuir = document.querySelector(".huir");
const menuMovimientos = document.querySelector(".botones-movimientos");
const btnVolverMovimientos = document.querySelector(".volver-atras-movimientos");
const btnNuevaPartida = document.querySelector(".boton-reinicio-end");
const contenedorBtnNuevaPartida = document.querySelector(".contenedor-boton-reiniciar");
const contenedorMochila = document.querySelector(".contenedor-mochila");
const bntVolverMochila = document.querySelector(".volver-atras-mochila");

const nombreUsuario = document.querySelector(".nombreUsuario");
const nombreEnemigo = document.querySelector(".nombreEnemigo");


let turno;

export function activarComandos() {
    menuDefault(true);
}

import { aniadirItemsAMochila } from "./mochila.js";
import { getStatItem } from "./mochila.js";

function menuDefault(valor) {
    console.log("menu_comandos.menuDefault: volviendo a establecer el menú");
    menu.removeEventListener("click", atkTest, true);
    
    if (valor == true) {
        aniadirTexto("Elige una opción...");
    }
    
    menu.setAttribute("style", "height: 200px; width: 100%;");
    contenedorBtnNuevaPartida.setAttribute("style", "display: none;");
    menuMovimientos.setAttribute("style", "display: none;");
    botones.setAttribute("style", "display: flex; justify-content: space-between; padding: 30px;");
    btnVolverMovimientos.setAttribute("style", "margin:auto 0px auto 0px;");
    btnVolverMovimientos.addEventListener("click", menuDefault, true);
    contenedorTexto.setAttribute("style", "height: 50%;");
    btnAtacar.addEventListener("click", menuAtaque, true);
    btnMochila.addEventListener("click", mochila, true);
    contenedorMochila.setAttribute("style", "display: none;");
    btnHuir.addEventListener("click", huir, true);

    if (valor == true) {
        aniadirItemsAMochila("Poción");
        aniadirItemsAMochila("Proteína");
    }
    bntVolverMochila.addEventListener("click", menuDefault, true);
}

function ocultarTodo() {
    contenedorTexto.setAttribute("style", "display: none;");
    botones.setAttribute("style", "display: none;");
}

import { establecerMovimientos } from "./movimientos.js";

function menuAtaque() {
    console.log("menu_comandos.menuAtaque: ...");
    ocultarTodo();
    menuMovimientos.setAttribute("style", "height: 100%;");
    establecerMovimientos();
}

function nuevaPartida() {
    console.log("menu_comandos.nuevaPartida: mostrando nueva partida");
    menuMovimientos.setAttribute("style", "display: none;");
    contenedorTexto.setAttribute("style", "height: 50%;");
    contenedorBtnNuevaPartida.setAttribute("style", "display: block;");
}

function isAlive(vidaUsuario, vidaEnemigo) {
    // null si ninguno muere, true si el usuario muere, false si muere el enemigo
    console.log("menu_comandos.isAlive: vidas --> "+vidaUsuario+" @ "+vidaEnemigo)
    if (vidaUsuario <= 0) {
        return true;
    }else if(vidaEnemigo <= 0) {
        return false;
    }else return null;
}

import { getInformacion } from "./batalla.js";

function comprobarGanador() {
    const info = getInformacion();
    console.log("menu_comandos.comprobarGanador -->"+info[1]+" @ "+info[3])
    const variable = isAlive(info[1], info[3]);
    if(variable == true) {
        // pierde el usuario
        console.log("menu_comandos.comprobarGanador: pierde usuario");
        perder();
        return true;
    }else if(variable == false) {
        // pierde el enemigo
        console.log("menu_comandos.comprobarGanador: gana usuario");
        ganar();
        return true;
    }else  {
        console.log("menu_comandos.comprobarGanador: no hay ganador o error");
        return null;
    }
}

function perder() {
    console.log("menu_comandos.perder: ...");
    nuevaPartida();

    aniadirTexto("Has perdido...");
}

function ganar() {
    console.log("menu_comandos.ganar: ...");
    nuevaPartida();
    
    aniadirTexto("¡Has ganado!");
}

import { atacar } from "./batalla.js";
import { getAtaque } from "./movimientos.js";

export function ataque(ataque, valor) {
    // muestra el menú de ataque
    ataque = ataque == null ? 0 : ataque;
    const datos = atacar(turno, ataque);
    turno = datos[0];

    console.log("menu_comandos.ataque.datos: "+datos)
    const valorVida = isAlive(datos[3], datos[5]);
    console.log("menu_comandos.ataque.valorvida: "+valorVida)

    // si nadie ha muerto, llamamos a atacar
    if (turno) {
        textoAtaque(datos[1], datos[4], datos[2], datos[6], datos[7]);
    }else {
        textoAtaque(datos[1], datos[2], datos[4], datos[6], datos[7]);
    }

    // primero comprobamos nadie ha muerto
    if (valorVida === null || valor) {
        console.log("menu_comandos.ataque: yendo a esperarAccion("+ataque+")")
        esperarAccion(ataque);
    }else {
        comprobarGanador();
    }
}

function mochila() {
    // muestra una lista de objetos
    console.log("menu_comandos.mochila: abriendo mochila");
    botones.setAttribute("style", "display: none;");
    contenedorTexto.setAttribute("style", "display: none;");
    contenedorMochila.setAttribute("style", "");
}

function huir() {
    // 1 de 6 probabilidades de rerollear el enemigo
    // devuelve -1, 0 ó 1
    // -1 error
    // 0 huida
    // 1 no huye
    console.log("manue_comandos.huir: ");

}

function noEsperarAcion(atk) {
    console.log("menu_comandos.noEsperarAccion: volviendo al menu por defecto")
    ataque(atk, true);
    
    // para eliminar el eventListener
    // const nuevoMenu = menu.cloneNode(true);
    // menu.replaceWith(nuevoMenu);
    
    menuDefault();

    botones.setAttribute("style", "display: flex; justify-content: space-between; padding: 30px;");


}

let atkProvisional;

function atkTest() {
    noEsperarAcion(atkProvisional);
}

function esperarAccion(ataque) {
    console.log("menu_comandos.esperarAccion: ocultando menus y dejando solo el texto");
    atkProvisional = ataque;
    contenedorTexto.setAttribute("style", "height: 50%;");
    botones.setAttribute("style", "display: none;");
    menuMovimientos.setAttribute("style", "display: none;");

    const info = getInformacion();
    console.log("menu_comandos.comprobarGanador -->"+info[1]+" @ "+info[3])
    const variable = isAlive(info[1], info[3]);
    if (variable === null) {
        menu.addEventListener("click", atkTest, true);
    }
}


const textos = new Map([
    ["usado", " ha usuado "],
    ["inflingido", ", ha inflingido "],
    ["danioHecho", " daño a "],
    ["absorber", " También absorbe "],
    ["vidaDe", " puntos de vida del rival "],
    ["malicioso", ". La defensa de "],
    ["gruñido", ". El ataque de "],
    ["bajada", " ha bajado."]
 ]);


 // mensajes
 function textoAtaque(danio, pokemonEmisor, pokemonReceptor, absorbido, atk) {
    if (atk === 'placaje' || atk === 'absorber') {
        mostrarTexto(pokemonEmisor+textos.get("usado")+atk+textos.get("inflingido")+danio+textos.get("danioHecho")+pokemonReceptor+".");
        
        if (atk === 'absorber') {
            aniadirTexto(textos.get("absorber")+absorbido+textos.get("vidaDe")+pokemonReceptor+".");
        }

    }else if(atk === 'malicioso') {
        mostrarTexto(pokemonEmisor+textos.get("usado")+atk+textos.get("malicioso")+pokemonReceptor+textos.get("bajada"));
    }else if(atk === 'gruñido') {
        mostrarTexto(pokemonEmisor+textos.get("usado")+atk+textos.get("gruñido")+pokemonReceptor+textos.get("bajada"));
    }
}

function mostrarTexto(texto) {
    // pone un mensaje en el menú
    // cuando el usuario le da click, continúa el programa
    console.log("menu_comandos.mostrarTexto: cambiando el texto: "+texto)
    salidaTexto.innerHTML = texto;
    
}

function aniadirTexto(texto) {
    console.log("menu_comandos.aniadirTexto: añadiendo texto: "+texto)
    salidaTexto.innerHTML += " "+texto;
}
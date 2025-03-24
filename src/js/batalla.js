import { getApi } from './api.js';

// pantalla
const selector = document.querySelector(".selector");
const batalla = document.querySelector(".batalla");

// usuario
const userStatsPanel = document.querySelector(".statsUsuario");
const nombreUsuario = document.querySelector(".nombreUsuario");
const userHpPanel = document.querySelector(".stat-hp-usuario");
const userHpBar = document.querySelector(".barra-hp-usuario");
const userMaxHp = document.querySelector(".hp-maxima-usuario");
const userHp = document.querySelector(".hp-actual-usuario");
const userSprite = document.querySelector(".img-usuario");

let hpUsuario;
let atkUsuario;
let defUsuario;
let velUsuario;

// enemigo
const enemigoStatsPanel = document.querySelector(".statsEnemigo");
const nombreEnemigo = document.querySelector(".nombreEnemigo");
const enemigoHpPanel = document.querySelector(".stat-hp-enemigo");
const enemigoHpBar = document.querySelector(".barra-hp-enemigo");
const enemigoHpMax = document.querySelector(".hp-maxima-enemigo");
const enemigoHp = document.querySelector(".hp-actual-enemigo");
const enemigoSprite = document.querySelector(".img-enemigo");

let valorHpEnemigo;
let atkEnemigo;
let defEnemigo;
let velEnemigo;

let contadorTurnos = 0;

async function factorizarOutput(pokemon, flag) {
    
    if (flag){
        borrarEnemigo();
        const enemigo = await getApi(Math.floor(Math.random()*1024+1));
        factorizarEnemigo(enemigo);
    }else{
        selector.style.display = "none";
        // mostramos la pantalla de batalla
        batalla.style.display = "block";
        borrarEnemigo();
        borrarUsuario();
    
        // primero hay que poner los parámetros del pokemon
        // elegido en sus respectivos sitios...
        // para ello primero recuperamos sus datos de la api
        const user = await getApi(pokemon);
        if (user === undefined) {
            console.log("batalla.factorizarOutput --> user: "+user);
            factorizarUsuario(pokemon);
        }else factorizarUsuario(user);
        
        // recogemos un pokemon random...
        const enemigo = await getApi(Math.floor(Math.random()*1024+1));
        factorizarEnemigo(enemigo);
    }

    // ocultamos el selector...
    
    // TO-DO
    // añadir la consola visual donde eliges el ataque
}

/* ->->->->->->- USUAIRO -<-<-<-<-<-<- */
function borrarUsuario() {
    if (userSprite.lastChild) userSprite.lastChild.remove();
    nombreUsuario.innerHTML = "";
    hpUsuario = 0;
    atkUsuario = 0;
    defUsuario = 0;
    velUsuario = 0;
    userHp.innerHTML = "";
    userMaxHp.innerHTML = "";
}

async function factorizarUsuario(user) {
    nombreUsuario.innerHTML = user["name"];
    hpUsuario = user["stats"][0]["base_stat"];
    atkUsuario = user["stats"][1]["base_stat"];
    defUsuario = user["stats"][2]["base_stat"];
    velUsuario = user["stats"][5]["base_stat"];
    userHp.innerHTML = hpUsuario;
    userMaxHp.innerHTML = hpUsuario;

    ponerSpriteUsuario(user);

    // creamos las barras de vida
    // tenemos que hacer una barra de vida, para ello
    // voy a meter en userHpBar tantas veces como puntos de 
    // vida tenga un div, que tendrá la clase bloque-barra-vida,
    // el cual tendrá los estilos ya definidos
    ponerBarraVidaUsuario();
}

async function ponerSpriteUsuario(user) {
    const elementImg = document.createElement("img");

    let sprite = user["sprites"]["back_default"];
    if (sprite == undefined){
        sprite = user["sprites"]["front_default"];
    }

    elementImg.setAttribute("style", "width: 150px; height: 150px;");
    elementImg.setAttribute("src", sprite);
    userSprite.appendChild(elementImg);
}

function ponerBarraVidaUsuario() {

    while (userHpBar.firstChild) {
        userHpBar.removeChild(userHpBar.firstChild);
    }

    const anchoDelContenedor = userHpBar.clientWidth;
    const ancho = (anchoDelContenedor / userMaxHp.innerHTML).toFixed(2);
    for (let i = hpUsuario+1; i>0; i--) {

        // vamos a crear la barra de vida
        const elemento = document.createElement("div");
        elemento.setAttribute("class", "bloque-barra-vida");
        userHpBar.appendChild(elemento);
        userHpBar.lastChild.style.width = ancho+"px";
    }
}

export function addUsuarioHp(cantidad) {
    if (hpUsuario < userMaxHp.innerHTML) {
        let cantidadCurada = 0;
        while (cantidad > 0 && hpUsuario < userMaxHp.innerHTML) {
            hpUsuario++;
            cantidadCurada++;
            cantidad--;
        }
    
        console.log("batalla.addUsuarioHp: "+nombreUsuario.innerHTML+" curado x"+cantidadCurada);
        actulizarVidas();
        return cantidadCurada;
    }else {
        console.log("batalla.addUsuarioHp: vida al máximo");
        return -1;
    }

}

export function addUsuarioAtk(cantidad) {
    console.log("batalla.addUsuarioAtk: "+atkUsuario+">>>"+(atkUsuario+cantidad));
    atkEnemigo += cantidad;
    return atkUsuario;
}

export function addUsuarioDef(cantidad) {
    console.log ("batalla.addUsuarioDef: "+defUsuario+">>>"+(defUsuario+cantidad));
    defUsuario += cantidad;
    return defUsuario;
}

/* ->->->->->->- ENEMIGO -<-<-<-<-<-<- */

function borrarEnemigo() {
    if (enemigoSprite.lastChild) enemigoSprite.lastChild.remove();
    nombreEnemigo.innerHTML = "";
    valorHpEnemigo = 0;
    atkEnemigo = 0;
    defEnemigo = 0;
    velEnemigo = 0;
    enemigoHp.innerHTML = "";
    enemigoHpMax.innerHTML = "";
}

async function factorizarEnemigo(enemigo) {
    nombreEnemigo.innerHTML = enemigo["name"];
    valorHpEnemigo = enemigo["stats"][0]["base_stat"];
    enemigoHp.innerHTML = valorHpEnemigo;
    enemigoHpMax.innerHTML = valorHpEnemigo;
    atkEnemigo = enemigo["stats"][1]["base_stat"];
    defEnemigo = enemigo["stats"][2]["base_stat"];
    velEnemigo = enemigo["stats"][5]["base_stat"];

    ponerSpriteEnemigo(enemigo);

    // creamos las barras de vida
    // tenemos que hacer una barra de vida, para ello
    // voy a meter en userHpBar tantas veces como puntos de 
    // vida tenga un div, que tendrá la clase bloque-barra-vida,
    // el cual tendrá los estilos ya definidos
    ponerBarraVidaEnemigo();
}

async function ponerSpriteEnemigo(enemigo) {
    const elementImg = document.createElement("img");
    elementImg.setAttribute("style", "width: 150px; height: 150px;");
    elementImg.setAttribute("src", enemigo["sprites"]["front_default"]);
    enemigoSprite.appendChild(elementImg);
}

function ponerBarraVidaEnemigo() {
    
    while (enemigoHpBar.firstChild) {
        enemigoHpBar.removeChild(enemigoHpBar.firstChild);
    }

    const anchoDelContenedor = enemigoHpBar.clientWidth;
    const ancho = (anchoDelContenedor / enemigoHpMax.innerHTML).toFixed(2);
    for (let i = valorHpEnemigo+1; i>0; i--) {

        // vamos a crear la barra de vida
        const elemento = document.createElement("div");
        elemento.setAttribute("class", "bloque-barra-vida");
        enemigoHpBar.appendChild(elemento);
        enemigoHpBar.lastChild.style.width = ancho+"px";
    }
}

export function addEnemigoHp(cantidad) {
    let cantidadCurada = 0;
    while (cantidad < 0 && valorHpEnemigo <= enemigoHpMax.innerHTML) {
        valorHpEnemigo++;
        cantidadCurada++;
        cantidad--;
    }

    console.log("batalla.addUsuarioHp: "+nombreEnemigo.innerHTML+" curado x"+cantidadCurada);
    actulizarVidas();
    return cantidadCurada;
}

export function addEnemigoAtk(cantidad) {
    console.log("batalla.addEnemigoAtk: "+atkEnemigo+">>>"+(atkEnemigo+cantidad));
    atkEnemigo += cantidad;
    return atkEnemigo;
}


function actulizarVidas() {
    userHp.innerHTML = hpUsuario;
    enemigoHp.innerHTML = valorHpEnemigo;
    ponerBarraVidaUsuario();
    ponerBarraVidaEnemigo();
}

/* ->->->->->->- ATAQUE -<-<-<-<-<-<- */

import { getAtaque } from './movimientos.js';

function funcionAbsorber(danio) {
    const percentage = Math.floor((Math.random()*5)+10);
    const curacion = ((percentage*danio)/100)+5;
    console.log("batalla.funcionAbsorber: percentage: "+percentage+" | curacion: "+curacion+" | return: "+Math.floor(curacion))
    return Math.floor(curacion);
}

let ppHabilidadesUsuario = ["", 5, 5, 5];
let ppHabilidadesEnemigo = ["", 5, 5, 5];

export function atacar(flag, tipoAtaque) {
    contadorTurnos++;
    console.log("------------------------------------------------------------------------------");
    console.log("batalla.atacar: TURNO "+contadorTurnos);
    console.log("------------------------------------------------------------------------------");
    if (valorHpEnemigo == 0) return 0; // gana el usuario
    if (hpUsuario == 0) return 1; // gana el enemigo
    if (flag == undefined) {
        flag = velUsuario >= velEnemigo ? true : false;
    }
    let plusDanio;
    if (flag) {
        plusDanio = getAtaque(tipoAtaque);
    } 
        
    
    console.log("Ataca: "+flag);
    // si es positivo, ataca el usuario
    let curado = 0;
    let danioRecibir;
    let nuevoAtk = tipoAtaque;
    if (flag) {
        console.log("tAtaque: "+nuevoAtk+" "+plusDanio+" Usuario: atk> "+atkUsuario+" def> "+defUsuario+" vel> "+velUsuario);
        danioRecibir = (atkUsuario+plusDanio)-defEnemigo > 1 ? (atkUsuario+plusDanio)-defEnemigo : plusDanio;
        
        if (nuevoAtk === 'absorber'  || nuevoAtk == 10) {
            let curacion = funcionAbsorber(danioRecibir);
            ppHabilidadesUsuario[1]--;
            while (curacion > 0 && hpUsuario < userMaxHp.innerHTML) {
                hpUsuario++;
                curacion--;
                curado++;
            }
            ponerBarraVidaUsuario();
            console.log("batalla.atacar.absorber: curacion de absorber "+curado+" | "+nombreUsuario.innerHTML);
        }
        
        if (nuevoAtk === 'malicioso') {
            ppHabilidadesUsuario[3]--;
            let bajadaDefensa = defEnemigo-Math.floor((10*defEnemigo)/100);
            bajadaDefensa++;
            console.log("batalla.atacar.malicioso: "+defEnemigo+">>>"+bajadaDefensa);
            defEnemigo = bajadaDefensa;
        }else if (nuevoAtk == 'gruñido'){
            ppHabilidadesUsuario[2]--;
            let bajadaAtaque = atkEnemigo - Math.floor((10*atkEnemigo)/100);
            bajadaAtaque++;
            console.log("batalla.atacar.gruñido: "+atkEnemigo+">>>"+bajadaAtaque);
            atkEnemigo = bajadaAtaque;
        }else{
            
            for (let i = danioRecibir; i>0 && valorHpEnemigo>0; i--){
                if (enemigoHpBar.children.length == 1) {
                    valorHpEnemigo--;
                }else if (enemigoHpBar.lastChild != undefined) {
                    valorHpEnemigo--;
                    enemigoHpBar.removeChild(enemigoHpBar.lastChild);
                }else {
                    console.log("ERROR: el enemigo no ha podido procesar el daño");
                }
            }

        }

    }else {
        // ataca el enemigo
        nuevoAtk = getAtaque(Math.floor((Math.random()*6)+1));
        if (nuevoAtk == undefined){
            nuevoAtk = 'placaje';
            var danioAtk = getAtaque(nuevoAtk);
            danioRecibir = (atkEnemigo+danioAtk)-defUsuario > 1 ? (atkEnemigo+danioAtk)-defUsuario : danioAtk;
        } else {
            danioRecibir = (atkEnemigo+nuevoAtk)-defUsuario > 1 ? (atkEnemigo+nuevoAtk)-defUsuario : 25;
        }

        console.log("batalla.ataque.enemigo: nuevoMovimiento: "+nuevoAtk);
        
        console.log("Enemigo: tAtk "+nuevoAtk+" atk>"+atkEnemigo+" def> "+defEnemigo+" vel> "+velEnemigo);
        
        if (nuevoAtk === 'absorber') {
            ppHabilidadesEnemigo[1]--;
            let curacion = funcionAbsorber(danioRecibir);

            while (curacion > 0 && valorHpEnemigo < enemigoHpMax.innerHTML) {
                valorHpEnemigo++;
                curacion--;
                curado++;
            }
            ponerBarraVidaEnemigo();
            console.log("batalla.atacar.absorber.enemigo: curacion de absorber "+curado+" | "+nombreEnemigo.innerHTML);
        }
        
        if (nuevoAtk === 'malicioso') {
            ppHabilidadesEnemigo[3]--;
            let bajadaDefensa = defUsuario - Math.floor((10*defUsuario)/100);
            bajadaDefensa++;
            console.log("batalla.atacar.malicioso.enemigo: "+defUsuario+">>>"+bajadaDefensa);
            defUsuario = bajadaDefensa;
        }else if (nuevoAtk == 'gruñido'){
            ppHabilidadesEnemigo[2]--;
            let bajadaAtaque = atkUsuario - Math.floor((10*atkUsuario)/100);
            bajadaAtaque++;
            console.log("batalla.atacar.gruñido.enemigo: "+atkUsuario+">>>"+bajadaAtaque);
            atkUsuario = bajadaAtaque;
        }else {
            
            for (let i = danioRecibir; i>0 && hpUsuario>0; i--){
                if (userHpBar.children.length == 1){
                    hpUsuario--;
                }else if (userHpBar.lastChild != undefined) {
                    hpUsuario--;
                    userHpBar.removeChild(userHpBar.lastChild);
                }else{
                    console.log("ERROR: el usuario no ha podido procesar el daño ó daño insuficiente")
                }
            }
            
        }
    }
    
    console.log("ppUser: "+ppHabilidadesUsuario);
    console.log("ppEnemigo: "+ppHabilidadesEnemigo);
    
    
    actulizarVidas();
    console.log("------------------------------------------------------------------------------");
    console.log("batalla.atacar: fin TURNO "+contadorTurnos);
    console.log("------------------------------------------------------------------------------");
    console.log("AGH = "+typeof nuevoAtk);
    if (typeof nuevoAtk === 'number') {
        nuevoAtk = getAtaque(nuevoAtk);
    }
    console.log("AGH = "+typeof nuevoAtk);
    console.log("AGH = "+nuevoAtk);

    return [!flag, danioRecibir, nombreUsuario.innerHTML, hpUsuario, nombreEnemigo.innerHTML, valorHpEnemigo, curado, nuevoAtk];
}

export function getInformacion() {
    return [nombreUsuario.innerHTML, hpUsuario, nombreEnemigo.innerHTML, valorHpEnemigo];
}

import { activarComandos, ataque, rerollEnemigo } from './menu_comandos.js';

export function cargarBatalla(pokemon, flag) {

    // ocultamos el menú de seleccion

    // si no se ha elegido...
    if (pokemon == null) {
        return;
    }
    
    if (flag) {
        rerollEnemigo();
        factorizarOutput(pokemon, true);
    }else {
        activarComandos();
        factorizarOutput(pokemon);
    }

}
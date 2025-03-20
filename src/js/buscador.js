const busqueda = document.querySelector("#search-input");
const boton = document.querySelector("#search-button");
const nombre = document.querySelector("#pokemon-name");
const id = document.querySelector("#pokemon-id");
const peso = document.querySelector("#weight");
const altura = document.querySelector("#height");
const tipos = document.querySelector("#types");
const vida = document.querySelector("#hp");
const ataque = document.querySelector("#attack");
const defensa = document.querySelector("#defense");
const ataqueEspecial = document.querySelector("#special-attack");
const defensaEspecial = document.querySelector("#special-defense");
const velocidad = document.querySelector("#speed");

const url = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";
let apiUrl = "";

function refactorizarTexto(texto) {

  // hay que dejar solo los números y letras
  const patron = /[A-Za-z0-9]/;
  
  let resultado = "";

  for (let i = 0; i<texto.length; i++) {
    if (patron.test(texto.charAt(i))) {
      resultado += texto.charAt(i);
    }
  }
  
  return resultado.toLowerCase();
}

function buscarPokemon() {

  let pokemon = busqueda.value;
  // refactorizamos el texto para que sea en minúsculas y sin carácteres especiales
  pokemon = refactorizarTexto(pokemon);
  apiUrl = url+pokemon;
  tipos.innerHTML = "";

  buscarEnApi();


}

function tratarDatos(datos) {
  console.log(datos);
  
  // pintamos los datos
  nombre.innerHTML = datos["name"];
  id.innerHTML = "#"+datos["id"];
  vida.innerHTML = datos["stats"][0]["base_stat"];
  ataque.innerHTML = datos["stats"][1]["base_stat"];
  defensa.innerHTML = datos["stats"][2]["base_stat"];
  ataqueEspecial.innerHTML = datos["stats"][3]["base_stat"];
  defensaEspecial.innerHTML = datos["stats"][4]["base_stat"];
  velocidad.innerHTML = datos["stats"][5]["base_stat"];
  altura.innerHTML = datos["height"];
  peso.innerHTML = datos["weight"];
  
  let flag = true;
  let numero = 0;
  while (flag) {
    if (datos["types"][numero] != undefined) {
      const innerElement = document.createElement("a");
      tipos.appendChild(innerElement);
      innerElement.setAttribute("id", "tipo"+numero);
      const listaTipos = document.querySelector("#tipo"+numero);
      listaTipos.innerHTML = datos["types"][numero++]["type"]["name"].toUpperCase();

      if(datos["types"][numero] != undefined) {
        listaTipos.innerHTML += ", "
      }
    }else{
        flag = false;
    }
  }


  // creamos un elemento img con src del sprite front_default con id sprite
  const imgElement = document.createElement("img");
  document.querySelector("#imagen").appendChild(imgElement);
  imgElement.setAttribute("id", "sprite");
  const sprite = document.querySelector("#sprite");
  sprite.setAttribute("src", datos["sprites"]["front_default"]);
  }

async function buscarEnApi() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }else {
        const data = await response.json();
        tratarDatos(data);
        
    }
  } catch (error) {

    window.alert("Pokémon not found");
    
    console.error('There has been a problem with your fetch operation:', error);
    return null; // Return null in case of an error
  }
}


boton.onclick = buscarPokemon;
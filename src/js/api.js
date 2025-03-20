const url = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";
async function api(pokemon) {
    const apiUrl = url+pokemon;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Problemas de conexión');
      }else {
          const data = await response.json();
          
          return data;
          
      }
    } catch (error) {
  
      console.log("Pokémon no encontrado");
      
      console.error('Ha surgido un problema al recoger los datos:', error);
      return null; // Return null en caso de error
    }
  }

export function getApi(pokemon) {
    return api(pokemon);
}
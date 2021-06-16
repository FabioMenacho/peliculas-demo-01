const BASE_URL = "https://api.themoviedb.org/3/search/movie";
const API_KEY = "9a7eae791e1e15e2d54fa1bcc7a79a36";

export const getPelicula = async (pelicula) => {
 const endpoint = `${BASE_URL}?api_key=${API_KEY}&language=es-ES&query=${pelicula}&include_adult=false`
 const response = await fetch(endpoint);
 const rpta = await response.json();
 return rpta;
//  console.log(rpta);
};
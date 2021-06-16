import { getPelicula } from "./peli-servicios.js";
import { gebid } from "./peli-utils.js";

const BASE_IMG = "https://image.tmdb.org/t/p/w500/";

const formBusqueda = gebid("formBusqueda");
const inputBusqueda = gebid("inputBusqueda");
const contenedor = gebid("contenedor");
const title = gebid("title");


let total = 0;

const dibujarPeliculas = (peliculas) => {
    contenedor.innerHTML = "";
    title.innerHTML = "";

    let titulo = document.createElement("div");
    titulo.classList.add("col-12", "mb-3");

    titulo.innerHTML = `<h6 class="display-5">Resultado para: ${inputBusqueda.value} - Total: ${total} </h6>`

    title.append(titulo);

    peliculas.forEach((objPelicula) => {

        let col = document.createElement("div");
        col.classList.add("col-md-3", "mb-3");

        let card = document.createElement("div");
        card.classList.add("card", "shadow", "h-100");



        card.innerHTML = `
                        <img
                            src="${BASE_IMG}${objPelicula.poster_path}"
                            alt="foto de la película"
                            class="card-img-top"
                        />
                        <div class="card-body">
                            <h4 class="card-title">${objPelicula.title}</h4>
                            <p class="card-text">
                            ${objPelicula.overview.substr(0, 90)}...
                            </p>
                            <p class="card-text">
                            <small class="text-success">Popularidad: ${objPelicula.popularity}</small>
                            </p>
                        </div>
                        `;

        col.append(card);

        contenedor.append(col);

    });
};



formBusqueda.onsubmit = (e) => {
    e.preventDefault();
    getPelicula(inputBusqueda.value).then((rpta) => {

        if (rpta.total_results) {
            total = rpta.total_results;
            dibujarPeliculas(rpta.results);
            // console.log(total);
        } else {
            // Lanzar mensaje de error
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'No se encontró película',
            })
        };
    });
};
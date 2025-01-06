import { Filmes } from "../models/filmes";
import { View } from "./view.js";

export class FilmesView extends View<Filmes> {
  protected template(model: Filmes): string {
    return model
      .lista()
      .map((filme) => {
        return `
        <div class="card card-filme" >
          <i
            class="bi bi-plus-square-fill card-icon btnPlusEdit"
            data-id="${filme.id}"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#modalEditFilme"
          ></i>
          <div >
            <img src="${filme.imagem}" alt="Poster do filme ${filme.nome}" />
            <div class="card-body-overlay text-center text-white">
              <h5 class="card-titulo">${filme.nome}</h5>
              <p class="card-categoria">${filme.categoria.join(", ")}</p>
              <p class="card-ano">${filme.ano}</p>
            </div>
          </div> 
        </div>
    `;
      })
      .join("");
  }
}

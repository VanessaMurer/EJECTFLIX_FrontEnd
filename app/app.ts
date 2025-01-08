import { FilmeController } from "./controllers/filme-controller.js";
import { Filme } from "./models/filme.js";

const controller = new FilmeController();

controller.adicionaFilmesDaApi();

const formAdd = document.querySelector("#form-add");

const containerFilmes = document.querySelector("#filmes-container");

const btnsCategorias = document.querySelectorAll("[data-category]");

if (formAdd) {
  formAdd.addEventListener("submit", (event) => {
    event.preventDefault();
    controller.adicionarFilmeFromFormulario();
    controller.adicionaFilmesDaApi();
  });
} else {
  throw Error(
    "Não foi possível adicionar o filme. Verifique se o form existe."
  );
}

// if (containerFilmes) {
//   containerFilmes.addEventListener("click", (event) => {
//     const target = event.target as HTMLElement;

//     if (target.classList.contains("btnPlusEdit")) {
//       target.setAttribute("data-bs-toggle", "modal");
//       target.setAttribute("data-bs-target", "#modalEditFilme");

//       const id: string = target.getAttribute("data-id") as string;

//       const filmeEditar: Filme = controller.buscarFilmePeloId(id);

//       const nomeFilmeEdit = document.querySelector(
//         "#nomeFilmeEdit"
//       ) as HTMLInputElement;
//       const categoriaFilmeEdit = document.querySelector(
//         "#categoriaFilmeEdit"
//       ) as HTMLInputElement;
//       const anoFilmeEdit = document.querySelector(
//         "#anoFilmeEdit"
//       ) as HTMLInputElement;

//       if (nomeFilmeEdit && categoriaFilmeEdit && anoFilmeEdit) {
//         nomeFilmeEdit.value = filmeEditar.nome;
//         categoriaFilmeEdit.value = filmeEditar.categoria.join(", ");
//         anoFilmeEdit.value = filmeEditar.ano.toString();
//       } else {
//         console.error("Elementos de edição não encontrados");
//       }
//     }
//   });
// }

btnsCategorias.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    const categoria = (event.currentTarget as HTMLElement).getAttribute(
      "data-category"
    );

    if (categoria) {
      controller.filtrarCategoria(categoria);
    }
  });
});

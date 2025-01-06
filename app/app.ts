import { FilmeController } from "./controllers/filme-controller.js";

const controller = new FilmeController();

const formAdd = document.querySelector("#form-add");

const btnsCategorias = document.querySelectorAll("[data-category]");

if (formAdd) {
  formAdd.addEventListener("submit", (event) => {
    event.preventDefault();
    controller.adicionaFilme();
  });
} else {
  throw Error(
    "Não foi possível adicionar o filme. Verifique se o form existe."
  );
}

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

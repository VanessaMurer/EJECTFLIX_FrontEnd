import { FilmeController } from "./controllers/filme-controller.js";
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
}
else {
    throw Error("Não foi possível adicionar o filme. Verifique se o form existe.");
}
btnsCategorias.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        event.preventDefault();
        const categoria = event.currentTarget.getAttribute("data-category");
        if (categoria) {
            controller.filtrarCategoria(categoria);
        }
    });
});

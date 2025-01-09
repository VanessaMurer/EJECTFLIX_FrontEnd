import { FilmeController } from "./controllers/filme-controller.js";
const controller = new FilmeController();
controller.adicionaFilmesDaApi();
const formAdd = document.querySelector("#form-add");
const containerFilmes = document.querySelector("#filmes-container");
const btnsCategorias = document.querySelectorAll("[data-category]");
const btnSaveEdit = document.querySelector("#salvar-edicao");
const btnExcluir = document.querySelector(".btn-modal-excluir");
if (formAdd) {
    formAdd.addEventListener("submit", (event) => {
        event.preventDefault();
        controller.adicionarFilmeFromFormulario();
    });
}
else {
    throw Error("Não foi possível adicionar o filme. Verifique se o form existe.");
}
if (containerFilmes) {
    containerFilmes.addEventListener("click", (event) => {
        const target = event.target;
        if (target.classList.contains("btnPlusEdit")) {
            target.setAttribute("data-bs-toggle", "modal");
            target.setAttribute("data-bs-target", "#modalEditFilme");
            const id = target.getAttribute("data-id");
            console.log(id);
            const filmeEditar = controller.buscarFilmePeloId(id);
            const nomeFilmeEdit = document.querySelector("#nomeFilmeEdit");
            const categoriaFilmeEdit = document.querySelector("#categoriaFilmeEdit");
            const anoFilmeEdit = document.querySelector("#anoFilmeEdit");
            if (nomeFilmeEdit && categoriaFilmeEdit && anoFilmeEdit) {
                nomeFilmeEdit.value = filmeEditar.nome;
                categoriaFilmeEdit.value = filmeEditar.categoria.join(", ");
                anoFilmeEdit.value = filmeEditar.ano.toString();
                nomeFilmeEdit.setAttribute("data-id", id);
            }
            else {
                console.error("Elementos de edição não encontrados");
            }
        }
    });
}
if (btnSaveEdit) {
    btnSaveEdit.addEventListener("click", (event) => {
        event.preventDefault();
        const nomeFilmeEdit = document.querySelector("#nomeFilmeEdit");
        const categoriaFilmeEdit = document.querySelector("#categoriaFilmeEdit");
        const anoFilmeEdit = document.querySelector("#anoFilmeEdit");
        const id = nomeFilmeEdit.getAttribute("data-id");
        controller.editandoFilmeFromFormulario(id, nomeFilmeEdit.value, categoriaFilmeEdit.value, anoFilmeEdit.value);
    });
}
if (btnExcluir) {
    btnExcluir.addEventListener("click", () => {
        const nomeFilmeEdit = document.querySelector("#nomeFilmeEdit");
        const id = nomeFilmeEdit.getAttribute("data-id");
        controller.excluirFilme(id);
    });
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

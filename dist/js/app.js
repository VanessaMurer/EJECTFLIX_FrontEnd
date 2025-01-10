var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FilmeController } from "./controllers/filme-controller.js";
import { ApiServiceUsuario } from "./services/api-service-usuario.js";
const controller = new FilmeController();
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield ApiServiceUsuario.login("vanessa", "vanessa01");
            console.log("Login realizado com sucesso.");
            yield controller.adicionaFilmesDaApi();
            registrarEventos();
            console.log("Aplicação inicializada.");
        }
        catch (error) {
            console.error("Erro durante a inicialização:", error);
        }
    });
}
function registrarEventos() {
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
    if (containerFilmes) {
        containerFilmes.addEventListener("click", (event) => {
            const target = event.target;
            if (target.classList.contains("btnPlusEdit")) {
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
            var _a;
            event.preventDefault();
            const nomeFilmeEdit = document.querySelector("#nomeFilmeEdit");
            const categoriaFilmeEdit = document.querySelector("#categoriaFilmeEdit");
            const anoFilmeEdit = document.querySelector("#anoFilmeEdit");
            const posterFilmeEdit = document.querySelector("#editImagem");
            const id = nomeFilmeEdit.getAttribute("data-id");
            controller.editandoFilmeFromFormulario(id, nomeFilmeEdit.value, categoriaFilmeEdit.value, anoFilmeEdit.value, (_a = posterFilmeEdit.files) === null || _a === void 0 ? void 0 : _a[0]);
        });
    }
    if (btnExcluir) {
        btnExcluir.addEventListener("click", (event) => {
            event.preventDefault();
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
}
init();

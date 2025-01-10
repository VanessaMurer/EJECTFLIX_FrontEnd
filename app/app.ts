import { FilmeController } from "./controllers/filme-controller.js";
import { Filme } from "./models/filme.js";
import { ApiServiceFilmesApi } from "./services/api-service-filmes-api.js";
import { ApiServiceUsuario } from "./services/api-service-usuario.js";

const controller = new FilmeController();

async function init() {
  try {
    await ApiServiceUsuario.login("vanessa", "vanessa01");
    console.log("Login realizado com sucesso.");

    await controller.adicionaFilmesDaApi();

    registrarEventos();

    console.log("Aplicação inicializada.");
  } catch (error) {
    console.error("Erro durante a inicialização:", error);
  }
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
      const target = event.target as HTMLElement;

      if (target.classList.contains("btnPlusEdit")) {
        const id: string = target.getAttribute("data-id") as string;
        console.log(id);

        const filmeEditar: Filme = controller.buscarFilmePeloId(id);

        const nomeFilmeEdit = document.querySelector(
          "#nomeFilmeEdit"
        ) as HTMLInputElement;
        const categoriaFilmeEdit = document.querySelector(
          "#categoriaFilmeEdit"
        ) as HTMLInputElement;
        const anoFilmeEdit = document.querySelector(
          "#anoFilmeEdit"
        ) as HTMLInputElement;

        if (nomeFilmeEdit && categoriaFilmeEdit && anoFilmeEdit) {
          nomeFilmeEdit.value = filmeEditar.nome;
          categoriaFilmeEdit.value = filmeEditar.categoria.join(", ");
          anoFilmeEdit.value = filmeEditar.ano.toString();

          nomeFilmeEdit.setAttribute("data-id", id);
        } else {
          console.error("Elementos de edição não encontrados");
        }
      }
    });
  }

  if (btnSaveEdit) {
    btnSaveEdit.addEventListener("click", (event) => {
      event.preventDefault();

      const nomeFilmeEdit = document.querySelector(
        "#nomeFilmeEdit"
      ) as HTMLInputElement;
      const categoriaFilmeEdit = document.querySelector(
        "#categoriaFilmeEdit"
      ) as HTMLInputElement;
      const anoFilmeEdit = document.querySelector(
        "#anoFilmeEdit"
      ) as HTMLInputElement;
      const posterFilmeEdit = document.querySelector(
        "#editImagem"
      ) as HTMLInputElement;

      const id: string = nomeFilmeEdit.getAttribute("data-id") as string;

      controller.editandoFilmeFromFormulario(
        id,
        nomeFilmeEdit.value,
        categoriaFilmeEdit.value,
        anoFilmeEdit.value,
        posterFilmeEdit.files?.[0]
      );
    });
  }

  if (btnExcluir) {
    btnExcluir.addEventListener("click", (event) => {
      event.preventDefault();
      const nomeFilmeEdit = document.querySelector(
        "#nomeFilmeEdit"
      ) as HTMLInputElement;

      const id: string = nomeFilmeEdit.getAttribute("data-id") as string;

      controller.excluirFilme(id);
    });
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
}

init();

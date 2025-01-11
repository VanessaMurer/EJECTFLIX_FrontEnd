import { CadastroController } from "./controllers/cadastro-controller.js";
import { FilmeController } from "./controllers/filme-controller.js";
import { LoginController } from "./controllers/login-controller.js";

document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;

  if (currentPath.includes("index.html") || currentPath === "/") {
    // Pagina login
    const loginController = new LoginController();
    loginController.loginUsuario();
    console.log(currentPath);
  } else if (currentPath.includes("cadastro.html")) {
    // Pagina cadastro
    const controllerUsuariosCadastro = new CadastroController();
    controllerUsuariosCadastro.cadastroUsuario();
    console.log("Página de cadastro inicializada:", currentPath);
  } else if (currentPath.includes("filmes.html")) {
    // Pagina filmes
    const controllerFilmes = new FilmeController();
    controllerFilmes.adicionaFilmesDaApi();
    console.log(currentPath);
    registrarEventos(controllerFilmes);
  }

  console.log("Aplicação inicializada na página:", currentPath);
});

function registrarEventos(controllerFilmes: FilmeController) {
  // Elementos da página
  const formAdd = document.querySelector("#form-add");
  const containerFilmes = document.querySelector("#filmes-container");
  const btnsCategorias = document.querySelectorAll("[data-category]");
  const btnSaveEdit = document.querySelector("#salvar-edicao");
  const btnExcluir = document.querySelector(".btn-modal-excluir");

  // Adicionar filme
  if (formAdd) {
    formAdd.addEventListener("submit", (event) => {
      event.preventDefault();
      controllerFilmes.adicionarFilmeFromFormulario();
    });
  }

  // Editar filme
  if (containerFilmes) {
    containerFilmes.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;

      if (target.classList.contains("btnPlusEdit")) {
        const id = target.getAttribute("data-id");
        if (!id) {
          console.error("ID do filme não encontrado.");
          return;
        }

        const filmeEditar = controllerFilmes.buscarFilmePeloId(id);

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
          console.error("Campos de edição não encontrados.");
        }
      }
    });
  }

  // Salvar edição
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

      const id = nomeFilmeEdit?.getAttribute("data-id");

      if (id) {
        controllerFilmes.editandoFilmeFromFormulario(
          id,
          nomeFilmeEdit.value,
          categoriaFilmeEdit.value,
          anoFilmeEdit.value,
          posterFilmeEdit?.files?.[0]
        );
      } else {
        console.error("ID do filme para edição não encontrado.");
      }
    });
  }

  // Excluir filme
  if (btnExcluir) {
    btnExcluir.addEventListener("click", (event) => {
      event.preventDefault();

      const nomeFilmeEdit = document.querySelector(
        "#nomeFilmeEdit"
      ) as HTMLInputElement;

      const id = nomeFilmeEdit?.getAttribute("data-id");

      if (id) {
        controllerFilmes.excluirFilme(id);
      } else {
        console.error("ID do filme para exclusão não encontrado.");
      }
    });
  }

  // Filtrar por categorias
  btnsCategorias.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      const categoria = (event.currentTarget as HTMLElement).getAttribute(
        "data-category"
      );

      if (categoria) {
        controllerFilmes.filtrarCategoria(categoria);
      } else {
        console.error("Categoria não encontrada.");
      }
    });
  });
}

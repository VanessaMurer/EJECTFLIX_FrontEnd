import { Filme } from "../models/filme.js";
import { Filmes } from "../models/filmes.js";
import { FilmesView } from "../views/filmes-view.js";

export class FilmeController {
  private inputNome: HTMLInputElement;
  private inputCategoria: HTMLInputElement;
  private inputAno: HTMLInputElement;
  private inputImagem: HTMLInputElement;
  private btnInicioElements: NodeListOf<HTMLAnchorElement>;

  private filmes = new Filmes();
  private filmesView = new FilmesView("#filmes-container");

  constructor() {
    this.inputNome = document.querySelector(
      "#nomeFilmeAdd"
    ) as HTMLInputElement;
    this.inputCategoria = document.querySelector(
      "#categoriaFilmeAdd"
    ) as HTMLInputElement;
    this.inputAno = document.querySelector("#anoFilmeAdd") as HTMLInputElement;
    this.inputImagem = document.querySelector(
      "#imagemFilmeAdd"
    ) as HTMLInputElement;

    this.btnInicioElements = document.querySelectorAll(".btn-inicio");

    this.btnInicioElements.forEach((btnInicio) => {
      btnInicio.addEventListener("click", () => {
        this.atualizacaoView();
      });
    });
  }

  public adicionaFilme(): void {
    const ano = parseInt(this.inputAno.value);
    const categorias = this.inputCategoria.value
      .split(",")
      .map((categoria) => categoria.trim());

    let imagemUrl = "./img/percy.png";

    if (this.inputImagem.files && this.inputImagem.files[0]) {
      const img = this.inputImagem.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        imagemUrl = reader.result as string;

        const filme = new Filme(
          this.inputNome.value,
          categorias,
          ano,
          imagemUrl
        );

        this.filmes.adiciona(filme);
        this.limparFormulario();
        this.atualizacaoView();
      };

      reader.readAsDataURL(img);
    } else {
      const filme = new Filme(this.inputNome.value, categorias, ano, imagemUrl);
      this.filmes.adiciona(filme);
      this.limparFormulario();
      this.atualizacaoView();
    }
  }

  public filtrarCategoria(categoria: string): void {
    const filmesFiltrados = this.filmes.filtrar(categoria);
    this.filmesView.update(filmesFiltrados);
  }

  public imprime(): void {
    console.log(this.filmes.lista());
  }

  private limparFormulario(): void {
    this.inputNome.value = "";
    this.inputCategoria.value = "";
    this.inputAno.value = "";
  }

  private atualizacaoView(): void {
    this.filmesView.update(this.filmes);
  }
}

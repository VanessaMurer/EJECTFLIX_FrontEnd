import { Filme } from "../models/filme.js";
import { Filmes } from "../models/filmes.js";
import { ApiServiceFilmes } from "../services/api-service-filmes.js";
import { FilmesView } from "../views/filmes-view.js";

export class FilmeController {
  private inputNome: HTMLInputElement;
  private inputCategoria: HTMLInputElement;
  private inputAno: HTMLInputElement;
  private inputImagem: HTMLInputElement;
  private btnInicioElements: NodeListOf<HTMLAnchorElement>;
  private filmesContainer: HTMLElement;

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

    this.filmesContainer = document.querySelector(
      "#filmes-container"
    ) as HTMLElement;

    this.btnInicioElements = document.querySelectorAll(".btn-inicio");

    this.btnInicioElements.forEach((btnInicio) => {
      btnInicio.addEventListener("click", () => {
        this.atualizacaoView();
      });
    });
  }

  public async adicionarFilmeFromFormulario() {
    const titulo = this.inputNome.value;
    const descricao = "";
    const ano_lancamento = parseInt(this.inputAno.value);
    const duracao = "";
    const genero = this.inputCategoria.value;
    const classificacao_etaria = "";
    const idioma_original = "";
    const data_estreia = "";
    const avaliacao_media = "";
    const poster = this.getUrlImagem();

    const filme = {
      titulo,
      descricao,
      ano_lancamento,
      duracao,
      genero,
      classificacao_etaria,
      idioma_original,
      data_estreia,
      avaliacao_media,
      poster,
    };

    const filmeSalvo: FilmeApi = await ApiServiceFilmes.salvarFilme(filme);

    const categorias: string[] = genero
      .split(",")
      .map((categoria) => categoria.trim());

    const novoFilme = new Filme(
      titulo,
      categorias,
      ano_lancamento,
      poster,
      filmeSalvo.id
    );

    this.filmes.adiciona(novoFilme);

    this.atualizacaoView();
    this.limparFormulario();
  }

  public async editandoFilmeFromFormulario(
    id: string,
    tituloEditado: string,
    categoriaEditada: string,
    anoEditado: string
  ) {
    const filmeOriginal: FilmeApi = await ApiServiceFilmes.buscarFilmeByID(id);

    const titulo = tituloEditado;
    const descricao = filmeOriginal.descricao;
    const ano_lancamento = parseInt(anoEditado);
    const duracao = filmeOriginal.duracao;
    const genero = categoriaEditada;
    const classificacao_etaria = filmeOriginal.classificacao_etaria;
    const idioma_original = filmeOriginal.idioma_original;
    const data_estreia = filmeOriginal.data_estreia;
    const avaliacao_media = filmeOriginal.avaliacao_media;
    const poster = "./img/percy.png";

    const filme = {
      titulo,
      descricao,
      ano_lancamento,
      duracao,
      genero,
      classificacao_etaria,
      idioma_original,
      data_estreia,
      avaliacao_media,
      poster,
    };

    try {
      await ApiServiceFilmes.atualizarFilme(id, filme);

      const categorias: string[] = categoriaEditada
        .split(",")
        .map((categoria) => categoria.trim());

      this.filmes.atualizaFilme(
        parseInt(id),
        titulo,
        categorias,
        ano_lancamento,
        poster
      );

      this.atualizacaoView();
    } catch (error) {
      throw error;
    }
  }

  public async excluirFilme(id: string) {
    try {
      await ApiServiceFilmes.excluirFilme(id);

      this.filmes.excluirFilme(parseInt(id));
      this.atualizacaoView();
    } catch (error) {}
  }

  public buscarFilmePeloId(id: string): Filme {
    const filmeDoId = this.filmes
      .lista()
      .find((filme) => filme.id === parseInt(id));

    if (filmeDoId) {
      return filmeDoId;
    } else {
      throw new Error("Filme não encontrado");
    }
  }

  public async adicionaFilmesDaApi() {
    try {
      const filmesApi: FilmeApi[] = await ApiServiceFilmes.buscarFilmes();

      filmesApi.forEach((filme) => {
        const nome: string = filme.titulo;
        const categoria: string[] = filme.genero
          .split(",")
          .map((categoria) => categoria.trim());
        const ano: number = filme.ano_lancamento;
        const poster: string = "./img/percy.png";
        const id: number = Number(filme.id);

        const novoFilme = new Filme(nome, categoria, ano, poster, id);
        this.filmes.adiciona(novoFilme);
      });

      this.atualizacaoView();
    } catch (error) {}
  }

  public filtrarCategoria(categoria: string): void {
    const filmesFiltrados = this.filmes.filtrar(categoria);
    this.filmesView.update(filmesFiltrados);
  }

  private getUrlImagem(): string {
    let imagemUrl = "./img/percy.png";

    if (this.inputImagem.files && this.inputImagem.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        imagemUrl = reader.result as string;
      };

      return imagemUrl;
    } else {
      return imagemUrl;
    }
  }

  private limparFormulario(): void {
    this.inputNome.value = "";
    this.inputCategoria.value = "";
    this.inputAno.value = "";
  }

  private atualizacaoView(): void {
    this.filmesContainer.innerHTML = "";
    this.filmesView.update(this.filmes);
  }
}

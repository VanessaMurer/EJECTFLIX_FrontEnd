import { Filme } from "../models/filme.js";
import { Filmes } from "../models/filmes.js";
import { ApiServiceFilmes } from "../services/api-service-filmes.js";
import { FilmesView } from "../views/filmes-view.js";
import { MensagemView } from "../views/mensagem-view.js";

export class FilmeController {
  private inputNome: HTMLInputElement;
  private inputCategoria: HTMLInputElement;
  private inputAno: HTMLInputElement;
  private inputImagem: HTMLInputElement;
  private filmesContainer: HTMLElement;

  private filmes = new Filmes();
  private filmesView = new FilmesView("#filmes-container");
  private mensagemViewAdd = new MensagemView(".mensagemViewAdd");
  private mensagemViewEdit = new MensagemView(".mensagemViewEdit");

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
  }

  public async adicionarFilmeFromFormulario() {
    const anoLancamento = parseInt(this.inputAno.value);

    const genero = this.inputCategoria.value;

    const poster = "./img/potter.jpg";

    const gerarId = () => Math.floor(Math.random() * 1000000).toString();
    const id = gerarId();

    const filme = this.criarObjetoFilme(
      this.inputNome.value,
      "",
      anoLancamento,
      "",
      this.inputCategoria.value,
      "",
      "",
      "",
      "",
      poster,
      id
    );

    try {
      await ApiServiceFilmes.salvarFilme(filme);

      const categorias: string[] = genero
        .split(",")
        .map((categoria) => categoria.trim());

      const novoFilme = new Filme(
        this.inputNome.value,
        categorias,
        anoLancamento,
        poster,
        parseInt(id)
      );

      this.filmes.adiciona(novoFilme);

      this.mensagemViewAdd.update("Filme adicionada com sucesso!", 3000);

      this.atualizacaoView();
      this.limparFormulario();
    } catch (error) {
      this.mensagemViewAdd.update("Erro ao adicionar filme", 3000);
    }
  }

  public async editandoFilmeFromFormulario(
    id: string,
    tituloEditado: string,
    categoriaEditada: string,
    anoEditado: string
  ) {
    try {
      const filmeOriginal: FilmeApi = await ApiServiceFilmes.buscarFilmeByID(
        id
      );

      const anoLancamento = parseInt(anoEditado);
      const categorias: string[] = categoriaEditada
        .split(",")
        .map((categoria) => categoria.trim());

      const filmeAtualizado = {
        ...filmeOriginal,
        titulo: tituloEditado,
        genero: categoriaEditada,
        ano_lancamento: parseInt(anoEditado),
      };

      await ApiServiceFilmes.atualizarFilme(id, filmeAtualizado);

      this.filmes.atualizaFilme(
        parseInt(id),
        tituloEditado,
        categorias,
        anoLancamento,
        filmeOriginal.poster
      );

      this.atualizacaoView();
      this.mensagemViewEdit.update("Filme editado com sucesso!", 3000);
    } catch (error) {
      this.mensagemViewEdit.update("Erro ao editar filme", 3000);
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
        const poster: string = filme.poster;
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

  private criarObjetoFilme(
    titulo: string,
    descricao: string,
    anoLancamento: number,
    duracao: string,
    genero: string,
    classificacaoEtaria: string,
    idiomaOriginal: string,
    dataEstreia: string,
    avaliacaoMedia: string,
    poster: string,
    id?: string
  ): object {
    const filme = {
      titulo,
      descricao,
      anoLancamento,
      duracao,
      genero,
      classificacaoEtaria,
      idiomaOriginal,
      dataEstreia,
      avaliacaoMedia,
      poster,
      id,
    };

    return filme;
  }

  private getUrlImagem(): Promise<string> {
    return new Promise((resolve, reject) => {
      let imagemUrl = "./img/potter.jpg";

      if (this.inputImagem.files && this.inputImagem.files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          imagemUrl = reader.result as string;
          resolve(imagemUrl);
        };

        reader.onerror = () => reject("Erro ao ler arquivo");

        reader.readAsDataURL(this.inputImagem.files[0]);
      } else {
        resolve(imagemUrl);
      }
    });
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

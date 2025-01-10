import { Filme } from "../models/filme.js";
import { Filmes } from "../models/filmes.js";
import { ApiServiceFilmesApi } from "../services/api-service-filmes-api.js";
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
    const titulo = this.inputNome.value.trim();
    const ano_lancamento = parseInt(this.inputAno.value.trim());
    const genero = this.inputCategoria.value.trim();
    const file = this.inputImagem.files?.[0];

    if (!titulo || !ano_lancamento || !genero || !file) {
      this.mensagemViewAdd.update(
        "Por favor, preencha todos os campos obrigatórios.",
        3000
      );
      return;
    }

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descricao", "Descrição padrão");
    formData.append("ano_lancamento", ano_lancamento.toString());
    formData.append("duracao", "01:30:00");
    formData.append("genero", genero);
    formData.append("classificacao_etaria", "Livre");
    formData.append("idioma_original", "en");
    formData.append("data_estreia", "2021-09-11");
    formData.append("avaliacao_media", "7.0");
    formData.append("poster", file);

    try {
      const filmeAdicionado = await ApiServiceFilmesApi.salvarFilme(formData);
      console.log(filmeAdicionado);

      const categorias: string[] = genero
        .split(",")
        .map((categoria) => categoria.trim());

      const novoFilme = new Filme(
        this.inputNome.value,
        categorias,
        ano_lancamento,
        filmeAdicionado.poster,
        filmeAdicionado.id
      );

      this.filmes.adiciona(novoFilme);

      this.mensagemViewAdd.update("Filme adicionada com sucesso!", 3000);

      this.atualizacaoView();
      this.limparFormulario();
    } catch (error) {
      this.mensagemViewAdd.update("Erro ao adicionar filme", 3000);
      console.error("Erro ao adicionar filme:", error);
    }
  }

  public async editandoFilmeFromFormulario(
    id: string,
    tituloEditado: string,
    categoriaEditada: string,
    anoEditado: string,
    posterArquivo: File | undefined
  ) {
    try {
      const filmeOriginal: FilmeApi = await ApiServiceFilmesApi.buscarFilmeByID(
        parseInt(id)
      );

      const anoLancamento = parseInt(anoEditado);
      const categorias: string[] = categoriaEditada
        .split(",")
        .map((categoria) => categoria.trim());

      const filmeAtualizado = new FormData();
      filmeAtualizado.append("titulo", tituloEditado);
      filmeAtualizado.append("genero", categoriaEditada);
      filmeAtualizado.append("ano_lancamento", anoLancamento.toString());

      filmeAtualizado.append("descricao", filmeOriginal.descricao || "");
      filmeAtualizado.append("duracao", filmeOriginal.duracao || "");
      filmeAtualizado.append(
        "classificacao_etaria",
        filmeOriginal.classificacao_etaria || ""
      );
      filmeAtualizado.append(
        "idioma_original",
        filmeOriginal.idioma_original || ""
      );
      filmeAtualizado.append("data_estreia", filmeOriginal.data_estreia || "");

      if (posterArquivo) {
        filmeAtualizado.append("poster", posterArquivo);
      }

      await ApiServiceFilmesApi.atualizarFilme(parseInt(id), filmeAtualizado);

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
      await ApiServiceFilmesApi.excluirFilme(parseInt(id));

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
      const respostaApi: RespostaApi = await ApiServiceFilmesApi.buscarFilmes();
      const filmesApi: FilmeApi[] = respostaApi.results;

      filmesApi.forEach((filme) => {
        const nome: string = filme.titulo;
        const categoria: string[] = filme.genero
          .split(",")
          .map((categoria) => categoria.trim());
        const ano: number = filme.ano_lancamento;
        const poster: string = filme.poster;
        const id: number = filme.id;

        const novoFilme = new Filme(nome, categoria, ano, poster, id);
        this.filmes.adiciona(novoFilme);
      });

      this.atualizacaoView();
    } catch (error) {
      console.error("Erro ao adicionar filmes:", error);
    }
  }

  public filtrarCategoria(categoria: string): void {
    const filmesFiltrados = this.filmes.filtrar(categoria);
    this.filmesView.update(filmesFiltrados);
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

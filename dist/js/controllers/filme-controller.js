var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Filme } from "../models/filme.js";
import { Filmes } from "../models/filmes.js";
import { ApiServiceFilmesApi } from "../services/api-service-filmes-api.js";
import { FilmesView } from "../views/filmes-view.js";
import { MensagemView } from "../views/mensagem-view.js";
import { UsuarioController } from "./usuario-controller.js";
export class FilmeController {
    constructor() {
        this.filmes = new Filmes();
        this.filmesView = new FilmesView("#filmes-container");
        this.mensagemViewAdd = new MensagemView(".mensagemViewAdd");
        this.mensagemViewEdit = new MensagemView(".mensagemViewEdit");
        this.inputNome = document.querySelector("#nomeFilmeAdd");
        this.inputCategoria = document.querySelector("#categoriaFilmeAdd");
        this.inputAno = document.querySelector("#anoFilmeAdd");
        this.inputImagem = document.querySelector("#imagemFilmeAdd");
        this.filmesContainer = document.querySelector("#filmes-container");
        this.btnLogout = document.querySelector("#btnLogout");
        if (this.btnLogout) {
            this.btnLogout.addEventListener("click", UsuarioController.logoutUsuario.bind(this));
        }
    }
    adicionarFilmeFromFormulario() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const titulo = this.inputNome.value.trim();
            const ano_lancamento = parseInt(this.inputAno.value.trim());
            const genero = this.inputCategoria.value.trim();
            const file = (_a = this.inputImagem.files) === null || _a === void 0 ? void 0 : _a[0];
            if (!titulo || !ano_lancamento || !genero || !file) {
                this.mensagemViewAdd.update("Por favor, preencha todos os campos obrigatórios.", 3000);
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
                const filmeAdicionado = yield ApiServiceFilmesApi.salvarFilme(formData);
                console.log(filmeAdicionado);
                const categorias = genero
                    .split(",")
                    .map((categoria) => categoria.trim());
                const novoFilme = new Filme(this.inputNome.value, categorias, ano_lancamento, filmeAdicionado.poster, filmeAdicionado.id);
                this.filmes.adiciona(novoFilme);
                this.mensagemViewAdd.update("Filme adicionada com sucesso!", 3000);
                this.atualizacaoView();
                this.limparFormulario();
            }
            catch (error) {
                this.mensagemViewAdd.update("Erro ao adicionar filme", 3000);
                console.error("Erro ao adicionar filme:", error);
            }
        });
    }
    editandoFilmeFromFormulario(id, tituloEditado, categoriaEditada, anoEditado, posterArquivo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filmeOriginal = yield ApiServiceFilmesApi.buscarFilmeByID(parseInt(id));
                const anoLancamento = parseInt(anoEditado);
                const categorias = categoriaEditada
                    .split(",")
                    .map((categoria) => categoria.trim());
                const filmeAtualizado = new FormData();
                filmeAtualizado.append("titulo", tituloEditado);
                filmeAtualizado.append("genero", categoriaEditada);
                filmeAtualizado.append("ano_lancamento", anoLancamento.toString());
                filmeAtualizado.append("descricao", filmeOriginal.descricao || "");
                filmeAtualizado.append("duracao", filmeOriginal.duracao || "");
                filmeAtualizado.append("classificacao_etaria", filmeOriginal.classificacao_etaria || "");
                filmeAtualizado.append("idioma_original", filmeOriginal.idioma_original || "");
                filmeAtualizado.append("data_estreia", filmeOriginal.data_estreia || "");
                if (posterArquivo) {
                    filmeAtualizado.append("poster", posterArquivo);
                }
                yield ApiServiceFilmesApi.atualizarFilme(parseInt(id), filmeAtualizado);
                this.filmes.atualizaFilme(parseInt(id), tituloEditado, categorias, anoLancamento, filmeOriginal.poster);
                this.atualizacaoView();
                this.mensagemViewEdit.update("Filme editado com sucesso!", 3000);
            }
            catch (error) {
                this.mensagemViewEdit.update("Erro ao editar filme", 3000);
                throw error;
            }
        });
    }
    excluirFilme(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ApiServiceFilmesApi.excluirFilme(parseInt(id));
                this.filmes.excluirFilme(parseInt(id));
                this.atualizacaoView();
            }
            catch (error) { }
        });
    }
    buscarFilmePeloId(id) {
        const filmeDoId = this.filmes
            .lista()
            .find((filme) => filme.id === parseInt(id));
        if (filmeDoId) {
            return filmeDoId;
        }
        else {
            throw new Error("Filme não encontrado");
        }
    }
    adicionaFilmesDaApi() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respostaApi = yield ApiServiceFilmesApi.buscarFilmes();
                const filmesApi = respostaApi.results;
                filmesApi.forEach((filme) => {
                    const nome = filme.titulo;
                    const categoria = filme.genero
                        .split(",")
                        .map((categoria) => categoria.trim());
                    const ano = filme.ano_lancamento;
                    const poster = filme.poster;
                    const id = filme.id;
                    const novoFilme = new Filme(nome, categoria, ano, poster, id);
                    this.filmes.adiciona(novoFilme);
                });
                this.atualizacaoView();
            }
            catch (error) {
                console.error("Erro ao adicionar filmes:", error);
            }
        });
    }
    filtrarCategoria(categoria) {
        const filmesFiltrados = this.filmes.filtrar(categoria);
        this.filmesView.update(filmesFiltrados);
    }
    limparFormulario() {
        this.inputNome.value = "";
        this.inputCategoria.value = "";
        this.inputAno.value = "";
    }
    atualizacaoView() {
        this.filmesContainer.innerHTML = "";
        this.filmesView.update(this.filmes);
    }
}

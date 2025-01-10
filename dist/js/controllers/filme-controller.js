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
import { ApiServiceFilmes } from "../services/api-service-filmes.js";
import { FilmesView } from "../views/filmes-view.js";
import { MensagemView } from "../views/mensagem-view.js";
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
    }
    adicionarFilmeFromFormulario() {
        return __awaiter(this, void 0, void 0, function* () {
            const anoLancamento = parseInt(this.inputAno.value);
            const genero = this.inputCategoria.value;
            const poster = "./img/potter.jpg";
            const gerarId = () => Math.floor(Math.random() * 1000000).toString();
            const id = gerarId();
            const filme = this.criarObjetoFilme(this.inputNome.value, "", anoLancamento, "", this.inputCategoria.value, "", "", "", "", poster, id);
            try {
                yield ApiServiceFilmes.salvarFilme(filme);
                const categorias = genero
                    .split(",")
                    .map((categoria) => categoria.trim());
                const novoFilme = new Filme(this.inputNome.value, categorias, anoLancamento, poster, parseInt(id));
                this.filmes.adiciona(novoFilme);
                this.mensagemViewAdd.update("Filme adicionada com sucesso!", 3000);
                this.atualizacaoView();
                this.limparFormulario();
            }
            catch (error) {
                this.mensagemViewAdd.update("Erro ao adicionar filme", 3000);
            }
        });
    }
    editandoFilmeFromFormulario(id, tituloEditado, categoriaEditada, anoEditado) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filmeOriginal = yield ApiServiceFilmes.buscarFilmeByID(id);
                const anoLancamento = parseInt(anoEditado);
                const categorias = categoriaEditada
                    .split(",")
                    .map((categoria) => categoria.trim());
                const filmeAtualizado = Object.assign(Object.assign({}, filmeOriginal), { titulo: tituloEditado, genero: categoriaEditada, ano_lancamento: parseInt(anoEditado) });
                yield ApiServiceFilmes.atualizarFilme(id, filmeAtualizado);
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
                yield ApiServiceFilmes.excluirFilme(id);
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
                const filmesApi = yield ApiServiceFilmes.buscarFilmes();
                filmesApi.forEach((filme) => {
                    const nome = filme.titulo;
                    const categoria = filme.genero
                        .split(",")
                        .map((categoria) => categoria.trim());
                    const ano = filme.ano_lancamento;
                    const poster = filme.poster;
                    const id = Number(filme.id);
                    const novoFilme = new Filme(nome, categoria, ano, poster, id);
                    this.filmes.adiciona(novoFilme);
                });
                this.atualizacaoView();
            }
            catch (error) { }
        });
    }
    filtrarCategoria(categoria) {
        const filmesFiltrados = this.filmes.filtrar(categoria);
        this.filmesView.update(filmesFiltrados);
    }
    criarObjetoFilme(titulo, descricao, anoLancamento, duracao, genero, classificacaoEtaria, idiomaOriginal, dataEstreia, avaliacaoMedia, poster, id) {
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
    getUrlImagem() {
        return new Promise((resolve, reject) => {
            let imagemUrl = "./img/potter.jpg";
            if (this.inputImagem.files && this.inputImagem.files[0]) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    imagemUrl = reader.result;
                    resolve(imagemUrl);
                };
                reader.onerror = () => reject("Erro ao ler arquivo");
                reader.readAsDataURL(this.inputImagem.files[0]);
            }
            else {
                resolve(imagemUrl);
            }
        });
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

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
import { ApiService } from "../services/api-service.js";
import { FilmesView } from "../views/filmes-view.js";
export class FilmeController {
    constructor() {
        this.filmes = new Filmes();
        this.filmesView = new FilmesView("#filmes-container");
        this.inputNome = document.querySelector("#nomeFilmeAdd");
        this.inputCategoria = document.querySelector("#categoriaFilmeAdd");
        this.inputAno = document.querySelector("#anoFilmeAdd");
        this.inputImagem = document.querySelector("#imagemFilmeAdd");
        this.btnInicioElements = document.querySelectorAll(".btn-inicio");
        this.btnInicioElements.forEach((btnInicio) => {
            btnInicio.addEventListener("click", () => {
                this.atualizacaoView();
            });
        });
    }
    adicionarFilmeFromFormulario() {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield ApiService.salvarFilme(filme);
            this.limparFormulario();
        });
    }
    editarFilmeFromFormulario() {
        return __awaiter(this, void 0, void 0, function* () { });
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
                const filmesApi = yield ApiService.buscarFilmes();
                filmesApi.forEach((filme) => {
                    const nome = filme.titulo;
                    const categoria = filme.genero
                        .split(",")
                        .map((categoria) => categoria.trim());
                    const ano = filme.ano_lancamento;
                    const poster = "./img/percy.png";
                    const id = filme.id;
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
    getUrlImagem() {
        let imagemUrl = "./img/percy.png";
        if (this.inputImagem.files && this.inputImagem.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                imagemUrl = reader.result;
            };
            return imagemUrl;
        }
        else {
            return imagemUrl;
        }
    }
    limparFormulario() {
        this.inputNome.value = "";
        this.inputCategoria.value = "";
        this.inputAno.value = "";
    }
    atualizacaoView() {
        this.filmesView.update(this.filmes);
    }
}

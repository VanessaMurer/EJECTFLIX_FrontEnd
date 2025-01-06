import { Filme } from "../models/filme.js";
import { Filmes } from "../models/filmes.js";
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
    adicionaFilme() {
        const ano = parseInt(this.inputAno.value);
        const categorias = this.inputCategoria.value
            .split(",")
            .map((categoria) => categoria.trim());
        let imagemUrl = "./img/percy.png";
        if (this.inputImagem.files && this.inputImagem.files[0]) {
            const img = this.inputImagem.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                imagemUrl = reader.result;
                const filme = new Filme(this.inputNome.value, categorias, ano, imagemUrl);
                this.filmes.adiciona(filme);
                this.limparFormulario();
                this.atualizacaoView();
            };
            reader.readAsDataURL(img);
        }
        else {
            const filme = new Filme(this.inputNome.value, categorias, ano, imagemUrl);
            this.filmes.adiciona(filme);
            this.limparFormulario();
            this.atualizacaoView();
        }
    }
    filtrarCategoria(categoria) {
        const filmesFiltrados = this.filmes.filtrar(categoria);
        this.filmesView.update(filmesFiltrados);
    }
    imprime() {
        console.log(this.filmes.lista());
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

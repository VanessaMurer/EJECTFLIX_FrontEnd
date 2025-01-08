import { Filme } from "./filme.js";
export class Filmes {
    constructor() {
        this.filmes = [];
    }
    adiciona(filme) {
        this.filmes.push(filme);
    }
    lista() {
        return this.filmes;
    }
    filtrar(categoria) {
        const filtrados = this.filmes.filter((filme) => filme.categoria.some((c) => c === categoria));
        const filmesFiltrados = new Filmes();
        filtrados.forEach((filme) => {
            filmesFiltrados.adiciona(filme);
        });
        return filmesFiltrados;
    }
    atualizaFilme(id, titulo, categoria, ano, imagem) {
        const index = this.filmes.findIndex((filme) => filme.id === id);
        if (index !== -1) {
            const filmeAtualizado = new Filme(titulo, categoria, ano, imagem, id);
            this.filmes[index] = filmeAtualizado;
        }
        else {
            console.error("Filme não encontrado na lista");
        }
    }
}

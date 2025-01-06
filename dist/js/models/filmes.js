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
}

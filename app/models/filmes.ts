import { Filme } from "./filme.js";

export class Filmes {
  private filmes: Filme[] = [];

  public adiciona(filme: Filme) {
    this.filmes.push(filme);
  }

  public lista(): readonly Filme[] {
    return this.filmes;
  }

  public filtrar(categoria: string): Filmes {
    const filtrados = this.filmes.filter((filme) =>
      filme.categoria.some((c) => c === categoria)
    );

    const filmesFiltrados = new Filmes();
    filtrados.forEach((filme) => {
      filmesFiltrados.adiciona(filme);
    });

    return filmesFiltrados;
  }
}

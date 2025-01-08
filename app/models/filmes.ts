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

  public atualizaFilme(
    id: number,
    titulo: string,
    categoria: string[],
    ano: number,
    imagem: string
  ) {
    const index = this.filmes.findIndex((filme) => filme.id === id);

    if (index !== -1) {
      const filmeAtualizado = new Filme(titulo, categoria, ano, imagem, id);

      this.filmes[index] = filmeAtualizado;
    } else {
      console.error("Filme não encontrado na lista");
    }
  }

  public excluirFilme(id: number) {
    const index = this.filmes.findIndex((filme) => filme.id === id);

    if (index !== -1) {
      this.filmes.splice(index, 1);
    } else {
      console.error("Filme não encontrado na lista");
    }
  }
}

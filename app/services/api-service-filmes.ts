export class ApiServiceFilmes {
  private static BASE_URL = "http://localhost:3001/filmes";

  static async buscarFilmes(): Promise<FilmeApi[]> {
    try {
      const response = await axios.get<FilmeApi[]>(`${this.BASE_URL}`);
      return await response.data;
    } catch (error) {
      throw error;
    }
  }

  static async salvarFilme(filme: Object): Promise<FilmeApi> {
    try {
      const response = await axios.post<FilmeApi>(`${this.BASE_URL}`, filme);
      console.log(filme);
      console.log("Filme adicionado com sucesso");

      return await response.data;
    } catch (error) {
      throw error;
    }
  }

  static async buscarFilmeByID(id: string): Promise<FilmeApi> {
    try {
      const response = await axios.get<FilmeApi>(`${this.BASE_URL}/${id}`);
      return await response.data;
    } catch (error) {
      throw error;
    }
  }

  static async atualizarFilme(id: string, filme: object) {
    try {
      await axios.put(`${this.BASE_URL}/${id}`, filme);
      console.log("Filme atualizado com sucesso", filme);
    } catch (error) {
      console.error("Erro ao atualizar o filme:", error);
      throw error;
    }
  }

  static async excluirFilme(id: string) {
    try {
      await axios.delete(`${this.BASE_URL}/${id}`);
    } catch (error) {
      throw error;
    }
  }
}
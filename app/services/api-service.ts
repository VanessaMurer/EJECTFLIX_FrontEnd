export class ApiService {
  private static BASE_URL = "http://localhost:3001";

  static async buscarFilmes(): Promise<FilmeApi[]> {
    try {
      const response = await axios.get<FilmeApi[]>(`${this.BASE_URL}/filmes`);
      return await response.data;
    } catch (error) {
      throw error;
    }
  }

  static async salvarFilme(filme: Object) {
    try {
      const response = await axios.post(`${this.BASE_URL}/filmes`, filme);
      console.log(filme);
      console.log("Filme adicionado com sucesso");

      return await response.data;
    } catch (error) {
      throw error;
    }
  }

  static async buscarFilmeByID(id: string): Promise<FilmeApi> {
    try {
      const response = await axios.get<FilmeApi>(
        `${this.BASE_URL}/filmes/${id}`
      );
      return await response.data;
    } catch (error) {
      throw error;
    }
  }

  static async atualizarFilme(id: string, filme: object) {
    try {
      await axios.put(`${this.BASE_URL}/filmes/${id}`, filme);
      console.log("Filme atualizado com sucesso", filme);
    } catch (error) {
      console.error("Erro ao atualizar o filme:", error);
      throw error;
    }
  }

  static async excluirFilme(id: string) {
    try {
      await axios.delete(`${this.BASE_URL}/filmes/${id}`);
    } catch (error) {
      throw error;
    }
  }
}

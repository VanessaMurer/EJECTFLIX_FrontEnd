export class ApiServiceFilmes {
  private static BASE_URL = "http://localhost:3001/filmes";

  static async buscarFilmes(): Promise<FilmeApi[]> {
    try {
      const response = await axios.get<FilmeApi[]>(`${this.BASE_URL}`);
      return await response.data;
    } catch (error) {
      console.log("Erro ao buscar filmes");
      throw error;
    }
  }

  static async salvarFilme(filme: Object): Promise<FilmeApi> {
    try {
      const response = await axios.post<FilmeApi>(`${this.BASE_URL}`, filme);
      return await response.data;
    } catch (error) {
      console.log("Erro ao adicionar filme");
      throw error;
    }
  }

  static async buscarFilmeByID(id: string): Promise<FilmeApi> {
    try {
      const response = await axios.get<FilmeApi>(`${this.BASE_URL}/${id}`);
      return await response.data;
    } catch (error) {
      console.log("Erro ao buscar filme pelo ID");
      throw error;
    }
  }

  static async atualizarFilme(id: string, filme: object) {
    try {
      await axios.put(`${this.BASE_URL}/${id}`, filme);
    } catch (error) {
      console.log("Erro ao atualizar o filme pelo ID");
      throw error;
    }
  }

  static async excluirFilme(id: string) {
    try {
      await axios.delete(`${this.BASE_URL}/${id}`);
    } catch (error) {
      console.log("Erro ao excluir filme pelo ID");
      throw error;
    }
  }
}

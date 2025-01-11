export class ApiServiceFilmes {
  private static BASE_URL = "https://movies-api-juliocsoares.fly.dev/filmes";

  static async buscarFilmes(): Promise<RespostaApi> {
    try {
      const response = await axios.get<RespostaApi>(`${this.BASE_URL}/`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Erro ao buscar filmes");
      throw error;
    }
  }

  static async salvarFilme(filme: FormData): Promise<FilmeApi> {
    try {
      const response = await axios.post<FilmeApi>(`${this.BASE_URL}/`, filme, {
        headers: {},
        withCredentials: true,
      });
      return await response.data;
    } catch (error) {
      console.log("Erro ao adicionar filme");
      console.log(error.response.data);
      throw error;
    }
  }

  static async buscarFilmeByID(id: number): Promise<FilmeApi> {
    try {
      const response = await axios.get<FilmeApi>(`${this.BASE_URL}/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log(response.data);
      return await response.data;
    } catch (error) {
      console.log("Erro ao buscar filme pelo ID");
      throw error;
    }
  }

  static async atualizarFilme(id: number, filme: FormData) {
    try {
      await axios.put(`${this.BASE_URL}/${id}/`, filme, {
        headers: {},
        withCredentials: true,
      });
    } catch (error) {
      console.log("Erro ao atualizar o filme pelo ID");
      console.log(error.response.data);
      throw error;
    }
  }

  static async excluirFilme(id: number) {
    try {
      await axios.delete(`${this.BASE_URL}/${id}/`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      console.log("Erro ao excluir filme pelo ID");
      console.log(error.response.data);
      throw error;
    }
  }
}

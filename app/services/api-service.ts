export class ApiService {
  private static BASE_URL = "http://localhost:3001";

  static async buscarFilmes(): Promise<FilmeApi[]> {
    try {
      const respose = await axios.get<FilmeApi[]>(`${this.BASE_URL}/filmes`);
      return await respose.data;
    } catch (error) {
      throw error;
    }
  }

  static async salvarFilme(filme: Object) {
    try {
      const respose = await axios.post(`${this.BASE_URL}/filmes`, filme);
      console.log(filme);
      console.log("Filme adicionado com sucesso");

      return await respose.data;
    } catch (error) {
      throw error;
    }
  }
}

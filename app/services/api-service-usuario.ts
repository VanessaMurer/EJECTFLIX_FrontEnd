export class ApiServiceUsuario {
  private static baseURL = "https://movies-api-juliocsoares.fly.dev/";

  public static async login(username: string, password: string): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseURL}usuario/login/`,
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Login bem-sucedido:", response.data);
        return response.data;
      } else {
        throw new Error(
          `Erro no login: ${response.status} - ${response.statusText}`
        );
      }
    } catch (error: any) {
      console.error("Erro ao fazer login:", error.message);
      throw error;
    }
  }
}
// Método para requisições autenticadas
// public static async fetchFilmes(): Promise<any> {
//   try {
//     const response = await axios.get(`${this.baseURL}filmes/`, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       withCredentials: true, // Envia os cookies automaticamente
//     });

//     if (response.status === 200) {
//       console.log("Dados recebidos:", response.data);
//       return response.data;
//     } else {
//       throw new Error(
//         `Erro ao buscar filmes: ${response.status} - ${response.statusText}`
//       );
//     }
//   } catch (error: any) {
//     console.error("Erro ao buscar filmes:", error.message);
//     throw error;
//   }
// }

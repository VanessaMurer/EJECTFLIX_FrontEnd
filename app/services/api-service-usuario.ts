export class ApiServiceUsuario {
  private static BASE_URL = "https://movies-api-juliocsoares.fly.dev/usuario";

  public static async login(username: string, password: string): Promise<any> {
    try {
      const response = await axios.post(
        `${this.BASE_URL}/login/`,
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
    } catch (error) {
      console.log(error.response.data);
      console.error("Erro ao fazer login:", error.message);

      throw error;
    }
  }

  public static async logout() {
    try {
      const response = await axios.post(
        `${this.BASE_URL}/logout/`,
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return await response.data;
    } catch (error) {
      console.log("Erro ao fazer logout");
      console.log(error.response.data);
      throw error;
    }
  }

  public static async register(
    username: string,
    password: string
  ): Promise<any> {
    try {
      const confirm_password: string = password;
      const email: string = username + "@gmail.com";

      const response = await axios.post(
        `${this.BASE_URL}/register/`,
        {
          username,
          email,
          password,
          confirm_password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      console.error("Erro ao realizar o registro:", error);

      if (error.response) {
        console.error("Status do erro:", error.response.status);
        console.error("Dados do erro:", error.response.data);
      }
      throw error;
    }
  }
}

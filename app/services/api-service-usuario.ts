export class ApiServiceUsuario {
  private static BASE_URL = "https://movies-api-juliocsoares.fly.dev/usuario";

  public static async login(username: string, password: string): Promise<any> {
    try {
      console.log(username, password);
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

      const cadastro = {
        username,
        password,
        confirm_password,
      };

      const response = await axios.post(
        `${this.BASE_URL}/register/`,
        cadastro,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        console.log("Registro realizado com sucesso:", response.data);
        return response.data;
      } else {
        throw new Error(
          `Erro no registro: ${response.status} - ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Erro ao realizar o registro:", error.message);
      console.log(error.response.data);
      throw error;
    }
  }
}

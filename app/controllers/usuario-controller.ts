import { ApiServiceUsuario } from "../services/api-service-usuario.js";

export class UsuarioController {
  private inputUsername: HTMLInputElement;
  private inputPassword: HTMLInputElement;

  private formLogin: HTMLFormElement;

  constructor() {
    this.inputUsername = document.querySelector(
      "#inputUsername"
    ) as HTMLInputElement;
    this.inputPassword = document.querySelector(
      "#inputPassword"
    ) as HTMLInputElement;

    this.formLogin = document.querySelector("#login-form") as HTMLFormElement;
  }

  public loginUsuario() {
    if (this.formLogin) {
      this.formLogin.addEventListener("submit", (event) => {
        event.preventDefault();
        this.credenciaisUsuario();
      });
    }
  }

  public async credenciaisUsuario() {
    const username: string = this.inputUsername.value;
    const password: string = this.inputPassword.value;

    try {
      await ApiServiceUsuario.login(username, password);

      console.log("Login realizado com sucesso.");

      window.location.href = "./pages/filmes.html";
    } catch (error) {
      console.log("Erro ao fazer login", error);
    }
  }

  public static async logoutUsuario() {
    try {
      await ApiServiceUsuario.logout();
      console.log("Logout realizado com sucesso.");

      window.location.href = "../index.html";
    } catch (error) {
      console.error("Erro ao fazer logout", error);
    }
  }
}

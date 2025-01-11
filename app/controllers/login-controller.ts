import { ApiServiceUsuario } from "../services/api-service-usuario.js";
import { MensagemView } from "../views/mensagem-view.js";

export class LoginController {
  private inputUsername: HTMLInputElement | null = null;
  private inputPassword: HTMLInputElement | null = null;

  private formLogin: HTMLFormElement | null = null;
  private mensagemViewLogin = new MensagemView(".mensagemViewLogin");

  constructor() {
    this.formLogin = document.querySelector("#login-form");

    if (this.formLogin) {
      this.inputUsername = document.querySelector("#inputUsername");
      this.inputPassword = document.querySelector("#inputPassword");
    }
  }

  public loginUsuario() {
    if (this.formLogin && this.inputUsername && this.inputPassword) {
      this.formLogin.addEventListener("submit", (event) => {
        event.preventDefault();
        this.credenciaisUsuario();
      });
    }
  }

  public async credenciaisUsuario() {
    if (!this.inputUsername || !this.inputPassword) return;

    const username: string = this.inputUsername.value;
    const password: string = this.inputPassword.value;

    try {
      await ApiServiceUsuario.login(username, password);
      console.log("Login realizado com sucesso.");
      this.mensagemViewLogin.update("Login realizado com sucesso!", 3000);
      window.location.href = "./pages/filmes.html";
    } catch (error) {
      console.log("Erro ao fazer login", error);
      this.mensagemViewLogin.update("Erro ao realizar login", 3000);
    }
  }
}

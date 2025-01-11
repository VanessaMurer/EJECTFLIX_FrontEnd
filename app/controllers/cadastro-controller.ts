import { ApiServiceUsuario } from "../services/api-service-usuario.js";
import { MensagemView } from "../views/mensagem-view.js";

export class CadastroController {
  private usernameCadastro: HTMLInputElement | null = null;
  private passwordCadastro: HTMLInputElement | null = null;

  private formCadastro: HTMLFormElement | null = null;
  private mensagemViewCadastro = new MensagemView(".mensagemViewCadastro");

  constructor() {
    this.formCadastro = document.querySelector("#cadastro-form");

    if (this.formCadastro) {
      this.usernameCadastro = document.querySelector("#usernameCadastro");
      this.passwordCadastro = document.querySelector("#passwordCadastro");
    }
  }

  public cadastroUsuario() {
    if (this.formCadastro && this.usernameCadastro && this.passwordCadastro) {
      this.formCadastro.addEventListener("submit", (event) => {
        event.preventDefault();

        this.credenciaisCadastro();
      });
    }
  }

  public async credenciaisCadastro() {
    if (!this.usernameCadastro || !this.passwordCadastro) return;

    const username: string = this.usernameCadastro.value;
    const password: string = this.passwordCadastro.value;

    try {
      await ApiServiceUsuario.register(username, password);
      console.log("Cadastro realizado com sucesso.");
      this.mensagemViewCadastro.update("Cadastro realizado com sucesso!", 3000);
      window.location.href = "../index.html";
    } catch (error) {
      console.log("Erro ao realizar cadastro", error);
      this.mensagemViewCadastro.update("Erro ao realizar cadastro!", 3000);
    }
  }
}

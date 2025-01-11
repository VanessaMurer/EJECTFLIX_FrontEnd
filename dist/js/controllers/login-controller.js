var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApiServiceUsuario } from "../services/api-service-usuario.js";
import { MensagemView } from "../views/mensagem-view.js";
export class LoginController {
    constructor() {
        this.inputUsername = null;
        this.inputPassword = null;
        this.formLogin = null;
        this.mensagemViewLogin = new MensagemView(".mensagemViewLogin");
        this.formLogin = document.querySelector("#login-form");
        if (this.formLogin) {
            this.inputUsername = document.querySelector("#inputUsername");
            this.inputPassword = document.querySelector("#inputPassword");
        }
    }
    loginUsuario() {
        if (this.formLogin && this.inputUsername && this.inputPassword) {
            this.formLogin.addEventListener("submit", (event) => {
                event.preventDefault();
                this.credenciaisUsuario();
            });
        }
    }
    credenciaisUsuario() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.inputUsername || !this.inputPassword)
                return;
            const username = this.inputUsername.value;
            const password = this.inputPassword.value;
            try {
                yield ApiServiceUsuario.login(username, password);
                console.log("Login realizado com sucesso.");
                this.mensagemViewLogin.update("Login realizado com sucesso!", 3000);
                window.location.href = "./pages/filmes.html";
            }
            catch (error) {
                console.log("Erro ao fazer login", error);
                this.mensagemViewLogin.update("Erro ao realizar login", 3000);
            }
        });
    }
}

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
export class CadastroController {
    constructor() {
        this.usernameCadastro = null;
        this.passwordCadastro = null;
        this.formCadastro = null;
        this.mensagemViewCadastro = new MensagemView(".mensagemViewCadastro");
        this.formCadastro = document.querySelector("#cadastro-form");
        if (this.formCadastro) {
            this.usernameCadastro = document.querySelector("#usernameCadastro");
            this.passwordCadastro = document.querySelector("#passwordCadastro");
        }
    }
    cadastroUsuario() {
        if (this.formCadastro && this.usernameCadastro && this.passwordCadastro) {
            this.formCadastro.addEventListener("submit", (event) => {
                event.preventDefault();
                this.credenciaisCadastro();
            });
        }
    }
    credenciaisCadastro() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.usernameCadastro || !this.passwordCadastro)
                return;
            const username = this.usernameCadastro.value;
            const password = this.passwordCadastro.value;
            try {
                yield ApiServiceUsuario.register(username, password);
                console.log("Cadastro realizado com sucesso.");
                this.mensagemViewCadastro.update("Cadastro realizado com sucesso!", 3000);
                window.location.href = "../index.html";
            }
            catch (error) {
                console.log("Erro ao realizar cadastro", error);
                this.mensagemViewCadastro.update("Erro ao realizar cadastro!", 3000);
            }
        });
    }
}

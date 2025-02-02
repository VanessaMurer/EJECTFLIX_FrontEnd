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
export class UsuarioController {
    constructor() {
        this.inputUsername = null;
        this.inputPassword = null;
        this.usernameCadastro = null;
        this.passwordCadastro = null;
        this.formLogin = null;
        this.formCadastro = null;
        this.formLogin = document.querySelector("#login-form");
        this.formCadastro = document.querySelector("#cadastro-form");
        if (this.formLogin) {
            this.inputUsername = document.querySelector("#inputUsername");
            this.inputPassword = document.querySelector("#inputPassword");
        }
        if (this.formCadastro) {
            this.usernameCadastro = document.querySelector("#usernameCadastro");
            this.passwordCadastro = document.querySelector("#passwordCadastro");
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
                window.location.href = "./pages/filmes.html";
            }
            catch (error) {
                console.log("Erro ao fazer login", error);
                window.location.href = "./pages/cadastro.html";
            }
        });
    }
    cadastroUsuario() {
        if (this.formCadastro && this.usernameCadastro && this.passwordCadastro) {
            console.log("Formulário de cadastro encontrado. Registrando evento...");
            this.formCadastro.addEventListener("submit", (event) => {
                event.preventDefault();
                console.log("oi submit");
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
            console.log(username, password);
            try {
                yield ApiServiceUsuario.register(username, password);
                console.log("Cadastro realizado com sucesso.");
                window.location.href = "./index.html";
            }
            catch (error) {
                console.log("Erro ao fazer cadastro", error);
            }
        });
    }
    static logoutUsuario() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ApiServiceUsuario.logout();
                console.log("Logout realizado com sucesso.");
                window.location.href = "../index.html";
            }
            catch (error) {
                console.error("Erro ao fazer logout", error);
            }
        });
    }
}

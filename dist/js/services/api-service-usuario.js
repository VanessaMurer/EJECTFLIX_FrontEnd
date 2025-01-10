var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class ApiServiceUsuario {
    static login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(username, password);
                const response = yield axios.post(`${this.BASE_URL}/login/`, { username, password }, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
                if (response.status === 200) {
                    console.log("Login bem-sucedido:", response.data);
                    return response.data;
                }
                else {
                    throw new Error(`Erro no login: ${response.status} - ${response.statusText}`);
                }
            }
            catch (error) {
                console.log(error.response.data);
                console.error("Erro ao fazer login:", error.message);
                throw error;
            }
        });
    }
    static logout() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios.post(`${this.BASE_URL}/logout/`, {}, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
                return yield response.data;
            }
            catch (error) {
                console.log("Erro ao fazer logout");
                console.log(error.response.data);
                throw error;
            }
        });
    }
    static register(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const confirm_password = password;
                const cadastro = {
                    username,
                    password,
                    confirm_password,
                };
                const response = yield axios.post(`${this.BASE_URL}/register/`, cadastro, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.status === 201) {
                    console.log("Registro realizado com sucesso:", response.data);
                    return response.data;
                }
                else {
                    throw new Error(`Erro no registro: ${response.status} - ${response.statusText}`);
                }
            }
            catch (error) {
                console.error("Erro ao realizar o registro:", error.message);
                console.log(error.response.data);
                throw error;
            }
        });
    }
}
ApiServiceUsuario.BASE_URL = "https://movies-api-juliocsoares.fly.dev/usuario";

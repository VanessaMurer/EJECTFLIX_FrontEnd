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
                const response = yield axios.post(`${this.baseURL}usuario/login/`, { username, password }, {
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
                console.error("Erro ao fazer login:", error.message);
                throw error;
            }
        });
    }
}
ApiServiceUsuario.baseURL = "https://movies-api-juliocsoares.fly.dev/";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class ApiServiceFilmes {
    static buscarFilmes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios.get(`${this.BASE_URL}/`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
                console.log(response.data);
                return response.data;
            }
            catch (error) {
                console.log("Erro ao buscar filmes");
                throw error;
            }
        });
    }
    static salvarFilme(filme) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios.post(`${this.BASE_URL}/`, filme, {
                    headers: {},
                    withCredentials: true,
                });
                return yield response.data;
            }
            catch (error) {
                console.log("Erro ao adicionar filme");
                console.log(error.response.data);
                throw error;
            }
        });
    }
    static buscarFilmeByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios.get(`${this.BASE_URL}/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
                console.log(response.data);
                return yield response.data;
            }
            catch (error) {
                console.log("Erro ao buscar filme pelo ID");
                throw error;
            }
        });
    }
    static atualizarFilme(id, filme) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield axios.put(`${this.BASE_URL}/${id}/`, filme, {
                    headers: {},
                    withCredentials: true,
                });
            }
            catch (error) {
                console.log("Erro ao atualizar o filme pelo ID");
                console.log(error.response.data);
                throw error;
            }
        });
    }
    static excluirFilme(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield axios.delete(`${this.BASE_URL}/${id}/`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
            }
            catch (error) {
                console.log("Erro ao excluir filme pelo ID");
                console.log(error.response.data);
                throw error;
            }
        });
    }
}
ApiServiceFilmes.BASE_URL = "https://movies-api-juliocsoares.fly.dev/filmes";

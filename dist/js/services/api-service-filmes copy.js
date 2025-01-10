var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class ApiServiceFilmesApi {
    static buscarFilmes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios.get(`${this.BASE_URL}`);
                return yield response.data;
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
                const response = yield axios.post(`${this.BASE_URL}`, filme);
                return yield response.data;
            }
            catch (error) {
                console.log("Erro ao adicionar filme");
                throw error;
            }
        });
    }
    static buscarFilmeByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios.get(`${this.BASE_URL}/${id}`);
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
                yield axios.put(`${this.BASE_URL}/${id}`, filme);
            }
            catch (error) {
                console.log("Erro ao atualizar o filme pelo ID");
                throw error;
            }
        });
    }
    static excluirFilme(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield axios.delete(`${this.BASE_URL}/${id}`);
            }
            catch (error) {
                console.log("Erro ao excluir filme pelo ID");
                throw error;
            }
        });
    }
}
ApiServiceFilmesApi.BASE_URL = "http://localhost:3001/filmes";

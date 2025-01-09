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
                const response = yield axios.get(`${this.BASE_URL}`);
                return yield response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static salvarFilme(filme) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios.post(`${this.BASE_URL}`, filme);
                console.log(filme);
                console.log("Filme adicionado com sucesso");
                return yield response.data;
            }
            catch (error) {
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
                throw error;
            }
        });
    }
    static atualizarFilme(id, filme) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield axios.put(`${this.BASE_URL}/${id}`, filme);
                console.log("Filme atualizado com sucesso", filme);
            }
            catch (error) {
                console.error("Erro ao atualizar o filme:", error);
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
                throw error;
            }
        });
    }
}
ApiServiceFilmes.BASE_URL = "http://localhost:3001/filmes";

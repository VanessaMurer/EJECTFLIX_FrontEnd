var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class ApiService {
    static buscarFilmes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respose = yield axios.get(`${this.BASE_URL}/filmes`);
                return yield respose.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static salvarFilme(filme) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respose = yield axios.post(`${this.BASE_URL}/filmes`, filme);
                console.log(filme);
                console.log("Filme adicionado com sucesso");
                return yield respose.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
ApiService.BASE_URL = "http://localhost:3001";

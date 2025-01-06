export class Filme {
    constructor(nome, categoria, ano, imagem, id = `${nome}-${Date.now()}`) {
        this.nome = nome;
        this.categoria = categoria;
        this.ano = ano;
        this.imagem = imagem;
        this.id = id;
    }
}

export class View {
    constructor(seletor) {
        this.elemento = document.querySelector(seletor);
    }
    update(model, tempoExibicao) {
        let template = this.template(model);
        this.elemento.innerHTML = template;
        if (tempoExibicao !== undefined) {
            setTimeout(() => {
                this.elemento.innerHTML = "";
            }, tempoExibicao);
        }
    }
}

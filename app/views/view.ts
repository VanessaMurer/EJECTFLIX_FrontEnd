export abstract class View<T> {
  protected elemento: HTMLElement;

  constructor(seletor: string) {
    this.elemento = document.querySelector(seletor) as HTMLInputElement;
  }

  protected abstract template(model: T): string;

  public update(model: T, tempoExibicao?: number): void {
    let template = this.template(model);

    this.elemento.innerHTML = template;

    if (tempoExibicao !== undefined) {
      setTimeout(() => {
        this.elemento.innerHTML = "";
      }, tempoExibicao);
    }
  }
}

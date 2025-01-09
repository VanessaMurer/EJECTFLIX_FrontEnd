export abstract class View<T> {
  protected elemento: HTMLElement;

  constructor(seletor: string) {
    this.elemento = document.querySelector(seletor) as HTMLInputElement;
  }

  protected abstract template(model: T): string;

  public update(model: T): void {
    this.elemento.innerHTML = "";
    let template = this.template(model);

    this.elemento.innerHTML = template;
  }
}

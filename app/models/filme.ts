export class Filme {
  constructor(
    public readonly nome: string,
    public readonly categoria: string[],
    public readonly ano: number,
    public readonly imagem: string,
    public readonly id: number
  ) {}
}

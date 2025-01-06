export class Filme {
  constructor(
    public nome: string,
    public categoria: string[],
    public ano: number,
    public imagem: string,
    public readonly id: string = `${nome}-${Date.now()}`
  ) {}
}

export class Number2 {
  constructor(public x: number, public y: number) { }

  public equals(p: Number2): boolean {
    return this.x === p.x && this.y === p.y;
  }

  public randomize(c: number): void {
    this.x = Math.floor(Math.random() * c);
    this.y = Math.floor(Math.random() * c);
  }

  public add(a: Number2): void {
    this.x += a.x;
    this.y += a.y;
  }
}

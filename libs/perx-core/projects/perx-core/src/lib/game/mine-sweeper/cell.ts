export class Cell {
  public status: 'open' | 'clear' | 'flag' = 'open';
  public mine: boolean = false;
  public proximityMines: number = 0;

  constructor(public row: number, public column: number) {}
}

declare interface ITotalActive {
  totals: ITotal[];
}

declare interface ITotal {
  id?: number;
  title: string;
  value: any;
}

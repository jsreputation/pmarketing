export enum BaseType {
  text = 'type/Text',
  integer = 'type/Integer',
  float = 'type/Float',
}

export interface IData {
  columns: string[];
  cols: {
    name: string;
    display_name: string;
    base_type: BaseType;
    source: string;
  }[];
  rows: (string | number)[][];
  insights: any;
}

export interface MultipleChartData {
  series: {
    extra: {
      code: string
    };
    name: string;
    value: number;
  }[];
  name: string;
}

export interface SingleChartData {
  name: string;
  value: number;
}

export type ChartData = MultipleChartData | SingleChartData;

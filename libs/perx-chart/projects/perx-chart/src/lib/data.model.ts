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
    extra?: {
      code: string
    };
    name: string | number;
    value: string | number;
  }[];
  name: string | number;
}

export interface SingleChartData {
  name: string | number;
  value: string | number;
}

export interface TrendChartData {
  reward_name: string | number;
  revenue: string | number;
  chart_data: {
    series: {
      extra: {
        code: string
      };
      name: string;
      value: number;
    }[];
    name: string | number;
  }[];
}

export type ChartData = MultipleChartData | SingleChartData;

export enum BaseType {
  text = 'type/Text',
  integer = 'type/Integer',
  float = 'type/Float',
  date = 'type/Date'
}

export interface IData {
  // columns: string[];
  cols: {
    name: string;
    display_name: string;
    base_type: BaseType;
    source: string;
  }[];
  rows: (string | number | null)[][];
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

export type ChartData = MultipleChartData | SingleChartData;

export class DataSerializer {
  public static from(dataDto: IData): IData | null {
    if (!(dataDto && dataDto.cols)) {
      return null;
    }

    const cols = dataDto.cols.map(col => {
      col.display_name = col.display_name
        .charAt(0)
        .toUpperCase() + col.display_name
          .slice(1)
          .replace(/_/g, ' ');
      return col;
    });
    dataDto.cols = cols;
    return dataDto;
  }
}

import { BaseType, IData } from '@perx/chart';

export const singleData: IData = {
  // columns: ['age', 'count'],
  cols: [
    { name: 'age', display_name: 'Age', base_type: BaseType.text, source: 'native' },
    { name: 'count', display_name: 'Count', base_type: BaseType.integer, source: 'native' }
  ],
  rows: [
    ['18-', 178],
    ['18-24', 1378],
    ['25-34', 3960],
    ['35-44', 2722],
    ['45-54', 991],
    ['56-64', 376],
    ['65+', 168],
    ['Unknown', 1730]
  ],
  insights: null
};

export const multipleData: IData = {
  // columns: ['age', '2010', '2011'],
  cols: [
    { name: 'age', display_name: 'Age', base_type: BaseType.text, source: 'native' },
    { name: '2010', display_name: '2010', base_type: BaseType.integer, source: 'native' },
    { name: '2011', display_name: '2011', base_type: BaseType.integer, source: 'native' }
  ],
  rows: [
    ['18-', 178, 80],
    ['18-24', 1378, 1000],
    ['25-34', 3960, 4000],
    ['35-44', 2722, 2000],
    ['45-54', 991, 600],
    ['56-64', 376, 1000],
    ['65+', 168, 168],
    ['Unknown', 1730, 250]
  ],
  insights: null
};

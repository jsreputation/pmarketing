import { BASE_TYPE, IData } from '@perx/chart';

export const singleData: IData = {
  columns: ['age', 'count'],
  cols: [
    { name: 'age', display_name: 'Age', base_type: BASE_TYPE.text, source: 'native' },
    { name: 'count', display_name: 'Count', base_type: BASE_TYPE.integer, source: 'native' }
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
  columns: ['age', 'count'],
  cols: [
    { name: 'age', display_name: 'Age', base_type: BASE_TYPE.text, source: 'native' },
    { name: 'count', display_name: 'Count', base_type: BASE_TYPE.integer, source: 'native' }
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

import { BaseType, IData } from '@perx/chart';

export const data: IData = {
//   columns: [
//   'city',
//   'latitude',
//   'longitude',
//   'revenue'
// ],
  cols: [
  {
    name: 'city',
    display_name: 'City',
    base_type: BaseType.text,
    source: 'native'
  },
  {
    name: 'latitude',
    display_name: 'Latitude',
    base_type: BaseType.text,
    source: 'native'
  },
  {
    name: 'longitude',
    display_name: 'Longitude',
    base_type: BaseType.text,
    source: 'native'
  },
  {
    name: 'revenue',
    display_name: 'Revenue',
    base_type: BaseType.integer,
    source: 'native'
  }
],
  rows: [
  [
    'Bau',
    '5.3674009',
    '100.538609',
    1234
  ],
  [
    'Singapore',
    '1.3521',
    '103.8198',
    3245
  ],
  [
    'Kuala Lumpur',
    '3.1390',
    '101.6869',
    500
  ]
],
  insights: null
};

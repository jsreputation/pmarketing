import { IWRelationshipsDataType, relationshipsDataToArray, relationshipsDataToItem } from './jsonapi.payload';

describe('jsonapi.payload', () => {
  describe('relationshipsDataToArray', () => {
    test('on array should return array', () => {
      const input: IWRelationshipsDataType[] = [{ id: 'yo', type: 'yo' }];
      const res = relationshipsDataToArray(input);
      expect(res).toEqual(input);
    });

    test('on item should return array', () => {
      const input: IWRelationshipsDataType = { id: 'yo', type: 'yo' };
      const res = relationshipsDataToArray(input);
      expect(res).toEqual([input]);
    });

    test('on null should return an empty array', () => {
      const res = relationshipsDataToArray(null);
      expect(res).toEqual([]);
    });

    test('on undefined should return an empty array', () => {
      const res = relationshipsDataToArray(undefined);
      expect(res).toEqual([]);
    });
  });
  describe('relationshipsDataToItem', () => {

    test('on array should return first item', () => {
      const input: IWRelationshipsDataType = { id: 'yo', type: 'yo' };
      const res = relationshipsDataToItem([input]);
      expect(res).toEqual(input);
    });

    test('on empty array should return null', () => {
      const res = relationshipsDataToItem([]);
      expect(res).toEqual(null);
    });

    test('on item should return item', () => {
      const input: IWRelationshipsDataType = { id: 'yo', type: 'yo' };
      const res = relationshipsDataToItem(input);
      expect(res).toEqual(input);
    });

    test('on null should return null', () => {
      const res = relationshipsDataToItem(null);
      expect(res).toEqual(null);
    });

    test('on undefined should return null', () => {
      const res = relationshipsDataToItem(undefined);
      expect(res).toEqual(null);
    });
  });
});

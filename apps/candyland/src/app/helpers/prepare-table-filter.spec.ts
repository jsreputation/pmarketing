import { PrepareTableFilters } from './prepare-table-filters';

describe('PrepareTableFilter', () => {
    it('should count Field Value on empty array', () => {
        const res = PrepareTableFilters.countFieldValue([], 'yo');
        expect(Object.keys(res).length).toBe(0);
    });

    it('should count Field Value on a basic array', () => {
        const res = PrepareTableFilters.countFieldValue([
            { yo: 'plait' },
            { yo: 'bo' },
            { yo: 'bo' },
            {}
        ], 'yo');
        expect(Object.keys(res).length).toBe(2);
        expect(res.bo).toBeDefined();
        expect(res.bo).toBe(2);
        expect(res.plait).toBeDefined();
        expect(res.plait).toBe(1);
    });

    it('should count Field Value on an array with undefined fields', () => {
        const res = PrepareTableFilters.countFieldValue([
            { yo: 'plait' },
            { yo: 'bo' },
            undefined,
            { yo: 'bo' },
            {}
        ], 'yo');
        expect(Object.keys(res).length).toBe(2);
        expect(res.bo).toBeDefined();
        expect(res.bo).toBe(2);
        expect(res.plait).toBeDefined();
        expect(res.plait).toBe(1);
    });
});

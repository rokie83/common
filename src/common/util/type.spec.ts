import {type} from './type';

describe('Type', () => {

    it('should return string on type', () => {
        expect(type('test')).toBe('test');
    });

    it('should throw exception on same type', () => {
        expect(type('test_duplicate')).toBe('test_duplicate');
        expect(() => type('test_duplicate')).toThrow();
    });

});

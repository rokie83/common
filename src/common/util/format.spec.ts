import {formatDay, formatMonth, formatYear} from './format';

describe('Format', () => {

    describe('date', () => {
        it('should format day to two digits with leading zero', () => {
            expect(formatDay('')).toBe('0');
            expect(formatDay('1')).toBe('01');
            expect(formatDay('31')).toBe('31');
            expect(formatDay('311')).toBe('11');
        });

        it('should format month to two digits with leading zero', () => {
            expect(formatMonth('')).toBe('0');
            expect(formatMonth('1')).toBe('01');
            expect(formatMonth('12')).toBe('12');
            expect(formatMonth('112')).toBe('12');
        });

        it('should format year to four digits', () => {
            expect(formatYear('')).toBe('20');
            expect(formatYear('3')).toBe('203');
            expect(formatYear('17')).toBe('2017');
            expect(formatYear('117')).toBe('0117');
            expect(formatYear('2027')).toBe('2027');
            expect(formatYear('32027')).toBe('2027');
        });
    });

});

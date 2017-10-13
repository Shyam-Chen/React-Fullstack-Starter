import { INITIAL, INCREMENT, DECREMENT } from '../constants';
import counter from '../reducer';

describe('Counter', () => {
  describe('reducer', () => {
    it('should use INITIAL object and handle INCREMENT action', () => {
      expect(counter(INITIAL, { type: INCREMENT })).toEqual({ value: 1 });
    });

    it('should handle INCREMENT action', () => {
      expect(counter({ value: 1 }, { type: INCREMENT })).toEqual({ value: 2 });
    });

    it('should handle DECREMENT action', () => {
      expect(counter({ value: 1 }, { type: DECREMENT })).toEqual({ value: 0 });
    });
  });
});

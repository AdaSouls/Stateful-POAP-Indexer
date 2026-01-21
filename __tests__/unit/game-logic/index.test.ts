import { calculateProgress } from '@game/game-logic/src/index';

describe('Game Logic', () => {
  describe('calculateProgress', () => {
    it('should calculate progress correctly with initial experience', () => {
      expect(calculateProgress(0, 1)).toBe(10);
      expect(calculateProgress(0, 5)).toBe(50);
      expect(calculateProgress(0, 10)).toBe(100);
    });

    it('should add to previous experience', () => {
      expect(calculateProgress(20, 1)).toBe(30);
      expect(calculateProgress(50, 3)).toBe(80);
      expect(calculateProgress(100, 5)).toBe(150);
    });

    it('should handle zero gained experience', () => {
      expect(calculateProgress(40, 0)).toBe(40);
      expect(calculateProgress(100, 0)).toBe(100);
    });

    it('should handle negative previous experience', () => {
      expect(calculateProgress(-10, 1)).toBe(0);
      expect(calculateProgress(-20, 5)).toBe(30);
    });

    it('should handle large values', () => {
      expect(calculateProgress(1000, 100)).toBe(2000);
      expect(calculateProgress(5000, 250)).toBe(7500);
    });
  });
});



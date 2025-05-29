import {
  formatCurrency,
  formatDate,
  formatPercentage,
  generateTransactionId,
  calculateProgress,
} from "@/src/utils/formatters";

describe("formatters", () => {
  describe("formatCurrency", () => {
    it("formats positive amounts correctly", () => {
      expect(formatCurrency(1234.56)).toBe("$1,234.56");
    });

    it("formats negative amounts correctly", () => {
      expect(formatCurrency(-1234.56)).toBe("-$1,234.56");
    });

    it("formats zero correctly", () => {
      expect(formatCurrency(0)).toBe("$0.00");
    });
  });

  describe("formatDate", () => {
    it("formats date string correctly", () => {
      const result = formatDate("2024-01-15");
      expect(result).toMatch(/Jan 15, 2024/);
    });
  });

  describe("formatPercentage", () => {
    it("formats percentage with one decimal place", () => {
      expect(formatPercentage(12.345)).toBe("12.3%");
    });

    it("formats zero percentage", () => {
      expect(formatPercentage(0)).toBe("0.0%");
    });
  });

  describe("generateTransactionId", () => {
    it("generates unique transaction IDs", () => {
      const id1 = generateTransactionId();
      const id2 = generateTransactionId();
      
      expect(id1).toMatch(/^TXN\d+$/);
      expect(id2).toMatch(/^TXN\d+$/);
      expect(id1).not.toBe(id2);
    });
  });

  describe("calculateProgress", () => {
    it("calculates progress correctly", () => {
      expect(calculateProgress(50, 100)).toBe(50);
      expect(calculateProgress(75, 100)).toBe(75);
    });

    it("caps progress at 100%", () => {
      expect(calculateProgress(150, 100)).toBe(100);
    });

    it("handles zero target", () => {
      expect(calculateProgress(50, 0)).toBe(Infinity);
    });
  });
});

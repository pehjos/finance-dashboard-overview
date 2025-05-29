import {
  validateEmail,
  validatePhone,
  validateAmount,
  validateTransactionData,
} from "@/src/utils/validators";

describe("validators", () => {
  describe("validateEmail", () => {
    it("validates correct email addresses", () => {
      expect(validateEmail("test@example.com")).toBe(true);
      expect(validateEmail("user.name@domain.co.uk")).toBe(true);
    });

    it("rejects invalid email addresses", () => {
      expect(validateEmail("invalid-email")).toBe(false);
      expect(validateEmail("test@")).toBe(false);
      expect(validateEmail("@example.com")).toBe(false);
    });
  });

  describe("validatePhone", () => {
    it("validates correct phone numbers", () => {
      expect(validatePhone("+1 (555) 123-4567")).toBe(true);
      expect(validatePhone("5551234567")).toBe(true);
      expect(validatePhone("+44 20 7946 0958")).toBe(true);
    });

    it("rejects invalid phone numbers", () => {
      expect(validatePhone("123")).toBe(false);
      expect(validatePhone("abc-def-ghij")).toBe(false);
    });
  });

  describe("validateAmount", () => {
    it("validates positive amounts", () => {
      expect(validateAmount("100")).toBe(true);
      expect(validateAmount("99.99")).toBe(true);
      expect(validateAmount("0.01")).toBe(true);
    });

    it("rejects invalid amounts", () => {
      expect(validateAmount("0")).toBe(false);
      expect(validateAmount("-100")).toBe(false);
      expect(validateAmount("abc")).toBe(false);
      expect(validateAmount("")).toBe(false);
    });
  });

  describe("validateTransactionData", () => {
    it("validates complete transaction data", () => {
      const result = validateTransactionData({
        description: "Test transaction",
        amount: "100.00",
        recipient: "John Doe",
      });

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("returns errors for incomplete data", () => {
      const result = validateTransactionData({
        description: "",
        amount: "0",
        recipient: "",
      });

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Description is required");
      expect(result.errors).toContain("Valid amount is required");
      expect(result.errors).toContain("Recipient is required");
    });
  });
});

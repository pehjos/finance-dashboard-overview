export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-$$$$]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
}

export function validateAmount(amount: string): boolean {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0;
}

export function validateTransactionData(data: {
  description: string
  amount: string
  recipient: string
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.description.trim()) {
    errors.push("Description is required");
  }

  if (!validateAmount(data.amount)) {
    errors.push("Valid amount is required");
  }

  if (!data.recipient.trim()) {
    errors.push("Recipient is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export const formatCardNumber = (value: string) => {
  const numbers = value.replace(/[^\d]/g, "");
  const groups = numbers.match(/.{1,4}/g) || [];
  return groups.join(" ").substr(0, 19);
};

export const formatExpiryDate = (value: string) => {
  const numbers = value.replace(/[^\d]/g, "");
  if (numbers.length >= 2) {
    return `${numbers.substr(0, 2)}/${numbers.substr(2, 2)}`;
  }
  return numbers;
};

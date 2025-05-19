/** Converts "4045551212" -> "(404) 555-1212" as you type */
export const formatPhone = (raw: string) => {
  const digits = raw.replace(/\D/g, "").slice(0, 10); // keep max-10 digits
  const a = digits.slice(0, 3);
  const b = digits.slice(3, 6);
  const c = digits.slice(6);

  if (digits.length <= 3) return `(${a}`;
  if (digits.length <= 6) return `(${a}) ${b}`;
  return `(${a}) ${b}-${c}`;
};

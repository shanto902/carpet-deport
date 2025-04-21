export const parseStat = (stat: string) => {
  const match = stat.match(/^([^0-9]*)(\d[\d,]*)([^0-9]*)$/);
  if (!match) return { number: NaN, prefix: "", suffix: "" };

  const [, prefix, numStr, suffix] = match;
  const number = parseInt(numStr.replace(/,/g, ""), 10);

  return { number, prefix, suffix };
};

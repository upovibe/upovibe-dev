// utils/text.ts
export const truncateText = (text: string, maxLength: number = 20): string => {
    if (text.length <= maxLength) return text;
    const start = text.slice(0, 10);
    const end = text.slice(-10);
    return `${start}...${end}`;
  };
  
export const extractOrderIdFromMessage = (message: string): number | null => {
  const match = message.match(/Order ID:\s*(\d+)/i);
  return match ? Number(match[1]) : null;
};
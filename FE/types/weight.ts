export type WeightHistoryItem = {
  bmi: number;
  comment: string;
  height_cm: number;
  recorded_at: string; // ISO string
  weight_kg: number;
};

export type WeightHistoryResponse = {
  user_email: string;
  weight_history: WeightHistoryItem[];
};

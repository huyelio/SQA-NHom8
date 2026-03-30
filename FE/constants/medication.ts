export const UNIT_OPTIONS = [
  { id: 1, label: "Viên" },
  { id: 2, label: "Gói" },
  { id: 3, label: "Ống" },
  { id: 4, label: "ml" },
];

export const UNIT_DISPLAY: Record<number, string> = {
  1: "Viên",
  2: "Gói",
  3: "Ống",
  4: "ml",
};

export const enum FREQUENCY {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  INTERVAL = "INTERVAL",
}

export const FREQUENCY_OPTIONS = [
  { value: FREQUENCY.DAILY, label: "Hàng ngày" },
  { value: FREQUENCY.WEEKLY, label: "Hằng tuần" },
  { value: FREQUENCY.INTERVAL, label: "Cách ngày" },
];

export const enum WEEK_DAYS {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

export const WEEK_DAYS_OPTIONS = [
  { value: WEEK_DAYS.MONDAY, label: "Thứ Hai" },
  { value: WEEK_DAYS.TUESDAY, label: "Thứ Ba" },
  { value: WEEK_DAYS.WEDNESDAY, label: "Thứ Tư" },
  { value: WEEK_DAYS.THURSDAY, label: "Thứ Năm" },
  { value: WEEK_DAYS.FRIDAY, label: "Thứ Sáu" },
  { value: WEEK_DAYS.SATURDAY, label: "Thứ Bảy" },
  { value: WEEK_DAYS.SUNDAY, label: "Chủ nhật" },
];

export const WEEK_DAYS_DISPLAY: Record<string, string> = {
  MONDAY: "Thứ Hai",
  TUESDAY: "Thứ Ba",
  WEDNESDAY: "Thứ Tư",
  THURSDAY: "Thứ Năm",
  FRIDAY: "Thứ Sáu",
  SATURDAY: "Thứ Bảy",
  SUNDAY: "Chủ Nhật",
};

export const WEEK_ORDER = WEEK_DAYS_OPTIONS.map((d) => d.value);

export const WEEKDAY_MAP: Record<WEEK_DAYS, number> = {
  [WEEK_DAYS.SUNDAY]: 1,
  [WEEK_DAYS.MONDAY]: 2,
  [WEEK_DAYS.TUESDAY]: 3,
  [WEEK_DAYS.WEDNESDAY]: 4,
  [WEEK_DAYS.THURSDAY]: 5,
  [WEEK_DAYS.FRIDAY]: 6,
  [WEEK_DAYS.SATURDAY]: 7,
};

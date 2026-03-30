import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

export function getCurrentWeekRange() {
  const startOfWeek = dayjs().startOf("isoWeek"); // Thứ 2
  const endOfWeek = dayjs().endOf("isoWeek"); // Chủ nhật

  return {
    start_date: startOfWeek.format("YYYY-MM-DD"),
    end_date: endOfWeek.format("YYYY-MM-DD"),
  };
}

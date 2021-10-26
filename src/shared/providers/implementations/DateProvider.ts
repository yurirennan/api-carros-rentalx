import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DateProvider implements IDateProvider {
  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }

  createDate(): Date {
    return dayjs().toDate();
  }

  compareInHours(start_date: Date, end_date: Date): number {
    const start_date_formated = dayjs(start_date).utc().local().format();
    const end_date_formated = dayjs(end_date).utc().local().format();

    return dayjs(end_date_formated).diff(start_date_formated, "hours");
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const start_date_formated = dayjs(start_date).utc().local().format();
    const end_date_formated = dayjs(end_date).utc().local().format();

    const days = dayjs(start_date_formated).diff(end_date_formated, "day");

    return days;
  }
}

export default DateProvider;

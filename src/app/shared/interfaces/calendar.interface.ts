import {IToday} from "./today.interface";

export interface ICalendar {
  type: string,

  year: number,
  month: number,
  date: number,

  today: IToday,

  firstDayIndex: number,
  firstDayName: string,
  firstDayFullName: string,

  monthIndex: number,
  monthName: string,
  monthFullName: string,

  totalDays: number,

  targetedDayIndex: number,
  targetedDayName: string,
  targetedDayFullName: string,
}

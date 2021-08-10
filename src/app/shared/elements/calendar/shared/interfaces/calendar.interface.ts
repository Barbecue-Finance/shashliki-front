import {IToday} from "../../../../interfaces/today.interface";
import {FirstDay} from "./first-day.interface";
import {MonthInfo} from "./month-info.interface";
import {TargetedDay} from "./targeted-day.interface";

export interface ICalendar {
  type: string,

  year: number,
  month: number,
  date: number,

  today: IToday,

  firstDay: FirstDay,

  monthInfo: MonthInfo,

  totalDays: number,

  targetedDay: TargetedDay
}

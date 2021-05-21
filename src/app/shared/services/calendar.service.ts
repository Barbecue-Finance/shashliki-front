import {EventEmitter, Injectable, Output} from '@angular/core';
import {ICalendar} from "../interfaces/calendar.interface";
import {CalendarOptions} from "../interfaces/calendar-options";
import {IToday} from "../interfaces/today.interface";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private _calendar: ICalendar = {
    type: 'month',

    year: 0,
    month: 0,
    date: 0,

    today: {
      dayIndex: 0,
      dayName: '',
      dayFullName: '',

      monthIndex: 0,
      monthName: '',
      monthFullName: '',

      date: 0,

      year: 0
    },

    firstDayIndex: 0,
    firstDayName: '',
    firstDayFullName: '',

    monthIndex: 0,
    monthName: '',
    monthFullName: '',

    totalDays: 0,

    targetedDayIndex: 0,
    targetedDayName: '',
    targetedDayFullName: ''
  };

  private options: CalendarOptions = {
    type: '',
    target: '',
    month: 0,
    year: 0,
    date: 0,
    monthFormat: '',
    dayFormat: '',
    highlightToday: false,
    highlightTargetDate: false,
    prevNextButton: ''
  }

  readonly START_YEAR = 1900
  readonly END_YEAR = 9999

  readonly monthNameRu = {
    full: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    mmm: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
  }
  readonly monthNameEn = {
    full: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    mmm: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  }
  readonly dayNameRu = {
    full: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    d: ['П', 'В', 'С', 'Ч', 'П', 'С', 'В'],
    dd: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    ddd: ['Пон', 'Вто', 'Сре', 'Чет', 'Пят', 'Суб', 'Вос']
  }
  readonly dayNameEn = {
    full: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    d: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    dd: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    ddd: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  }

  dateChanged = new EventEmitter<Date>()

  constructor() {
  }

  get calendar(): ICalendar {
    return this._calendar
  }

  get todayDate(): number {
    return this._calendar.date
  }

  get todayMonth(): number {
    return this._calendar.month
  }

  get todayYear(): number {
    return this._calendar.year
  }

  /**
   * This function will return calendar detail.
   *
   *                          the current year.
   *                          if not set will consider the current month.
   * @return boolean    if error return false, else true
   * @param year
   * @param month
   * @param date
   */
  loadCalendar(year: number, month: number, date: number): boolean {
    let dateObj: Date;
    dateObj = new Date(date);


    if (year < this.START_YEAR || year > this.END_YEAR) {
      console.error("Invalid Year");
      return false;
    }
    if (month > 11 || month < 0) {
      console.error("Invalid Month");
      return false;
    }
    if (date > 31 || date < 1) {
      console.error("Invalid Date");
      return false;
    }

    this._calendar.year = year
    this._calendar.month = month
    this._calendar.date = date

    //today
    let dateString = dateObj.toString().split(" ");

    let idx = this.dayNameEn.ddd.indexOf(dateString[0]);
    this._calendar.today.dayIndex = idx;
    this._calendar.today.dayName = this.dayNameRu.ddd[idx];
    this._calendar.today.dayFullName = this.dayNameRu.full[idx];

    idx = this.monthNameEn.mmm.indexOf(dateString[1]);
    this._calendar.today.monthIndex = idx;
    this._calendar.today.monthName = this.monthNameRu.mmm[idx];
    this._calendar.today.monthFullName = this.monthNameRu.full[idx];

    this._calendar.today.date = dateObj.getDate();

    this._calendar.today.year = +dateString[3];

    //get month-year first day
    dateObj.setDate(1);
    dateObj.setMonth(month);
    dateObj.setFullYear(year);
    dateString = dateObj.toString().split(" ");

    idx = this.dayNameEn.ddd.indexOf(dateString[0]);
    this._calendar.firstDayIndex = idx;
    this._calendar.firstDayName = dateString[0];
    this._calendar.firstDayFullName = this.dayNameRu.full[idx];

    idx = this.monthNameEn.mmm.indexOf(dateString[1]);
    this._calendar.monthIndex = idx;
    this._calendar.monthName = dateString[1];
    this._calendar.monthFullName = this.monthNameRu.full[idx];

    //get total days for the month-year
    dateObj.setFullYear(year);
    dateObj.setMonth(month + 1);
    dateObj.setDate(0);
    this._calendar.totalDays = dateObj.getDate();

    //get month-year targeted date
    dateObj.setFullYear(year);
    dateObj.setMonth(month);
    dateObj.setDate(date);
    dateString = dateObj.toString().split(" ");

    idx = this.dayNameEn.ddd.indexOf(dateString[0]);
    this._calendar.targetedDayIndex = idx;
    this._calendar.targetedDayName = dateString[0];
    this._calendar.targetedDayFullName = this.dayNameRu.full[idx];

    return true;
  }

  /**
   * this function will draw the calendar based on user preferences.
   *
   * option = {
   *  target : "#id|.class"   //(mandatory) for id use #id | for class use .class
   *  type : "calendar-type"  //(optional) values: "day|month" (default "day")
   *  month : "integer"       //(optional) value 0-11, where 0 = January, ... 11 = December (default current month)
   *  year : "integer"        //(optional) example 1990. (default current year)
   *  date : "integer"        //(optional) example 1-31. (default current date)
   *  monthformat : "full"    //(optional) values: "mmm|full" (default "full")
   *  dayformat : "full"      //(optional) values: "ddd|full" (default "full")
   *  highlighttoday : boolean    //(optional) (default false) if true will highlight today's date
   *  highlighttargetdate : boolean   //(optional) (default false) if true will highlight targeted date of the month year
   *  prevnextbutton : "hide"         //(optional) (default "hide") (values: "show|hide") if set to "show" it will show the nav button (prev|next)
   * }
   *
   * @param object option     user preferences
   * @return boolean          true if success, false otherwise
   */
  init(options: CalendarOptions): string {
    if (typeof (this.options) === "undefined") {
      console.error("Option missing");
      return '';
    }

    let dateObj = new Date()

    this.options = options;

    this.options.month = dateObj.getMonth()
    this.options.year = dateObj.getFullYear()
    this.options.date = dateObj.getDate()


    return this.drawCalendar()
  }

  /**
   * this function will draw the calendar inside the target container.
   */
  private drawCalendar(): string {

    let calendarHTML: HTMLDivElement;
    let status: boolean;

    //get calendar HTML
    switch (this.options.type) {
      case "day":
        //get calendar detail
        status = this.loadCalendar(this.options.year, this.options.month, this.options.date);

        //get calendar html
        calendarHTML = this.drawCalendarDay();

        break;

      case "month":
        //get calendar detail
        status = this.loadCalendar(this.options.year, this.options.month, this.options.date);

        //get calendar html
        calendarHTML = this.drawCalendarMonth();
        break;

      default:
        break;
    }

    // @ts-ignore
    return calendarHTML.outerHTML
  }

  /**
   * this function will draw Calendar Day
   *
   * @return html
   */
  drawCalendarDay(): HTMLDivElement {
    //calendar container
    let container = document.createElement("div");
    container.setAttribute("class", "calendar-day-container");

    //-------------------------- Header ------------------

    //header div
    let div = document.createElement("div");
    div.setAttribute("class", "calendar-header");

    //day span
    let elem = document.createElement("span");
    elem.setAttribute("class", "calendar-span-day");
    elem.innerHTML = this.options.dayFormat === "ddd" ?
      this.dayNameRu.ddd[this._calendar.targetedDayIndex] :
      elem.innerHTML = this.dayNameRu.full[this._calendar.targetedDayIndex];

    //add day span to footer div
    div.appendChild(elem);

    //add header div to container
    container.appendChild(div);

    //-------------------------- Body ------------------

    //body div
    div = document.createElement("div");
    div.setAttribute("class", "calendar-body");

    //date span
    elem = document.createElement("span");
    elem.setAttribute("class", "calendar-span-date");
    elem.innerHTML = this._calendar.date + '';

    //add date span to body div
    div.appendChild(elem);

    //add body div to container
    container.appendChild(div);

    //-------------------------- Footer ------------------

    //footer div
    div = document.createElement("div");
    div.setAttribute("class", "calendar-footer");

    //month span
    elem = document.createElement("span");
    elem.setAttribute("class", "calendar-span-month-year");
    if (this.options.monthFormat === "mmm") {
      elem.innerHTML = this._calendar.monthName + " " + this._calendar.year;
    } else if (this.options.monthFormat === "full") {
      elem.innerHTML = this._calendar.monthFullName + " " + this._calendar.year;
    }

    //add month span to footer div
    div.appendChild(elem);

    //add footer div to container
    container.appendChild(div);

    //return container
    return container;
  }

  /**
   * this function will draw Calendar Month Table
   *
   * @return html
   * @param this.options
   */
  drawCalendarMonth(): HTMLDivElement {


    //get table
    let table: HTMLTableElement = this.createMonthTable();

    //calendar container
    let container = document.createElement("div");
    container.setAttribute("class", "calendar-month-container");

    //-------------------------- Header ------------------

    //header div
    let div = document.createElement("div");
    div.setAttribute("class", "calendar-header");
    div.setAttribute("data-option", JSON.stringify(this.options));

    let elem: HTMLSpanElement
    //prev button
    if (this.options.prevNextButton === "show") {
      elem = document.createElement("span");
      elem.setAttribute("class", "calendar-prev-next-btn prev-btn");
      elem.setAttribute("data-date", this.options.date + '');
      elem.setAttribute("data-month", this.options.month + '');
      elem.setAttribute("data-year", this.options.year + '');
      elem.setAttribute("data-btn", "prev");
      elem.innerHTML = "&lt;";
      //add prev button span to header div
      div.appendChild(elem);
    }

    //month span
    elem = document.createElement("span");
    elem.setAttribute("class", "calendar-span-month-year");
    if (this.options.monthFormat === "mmm") {
      elem.innerHTML = this._calendar.monthName.concat(' ', this._calendar.year + ' ');
    } else if (this.options.monthFormat === "full") {
      elem.innerHTML = this._calendar.monthFullName.concat(' ', this._calendar.year + ' ');
    }

    //add month span to header div
    div.appendChild(elem);

    //next button
    if (this.options.prevNextButton === "show") {
      elem = document.createElement("span");
      elem.setAttribute("class", "calendar-prev-next-btn next-btn");
      elem.setAttribute("data-date", this.options.date + '');
      elem.setAttribute("data-month", this.options.month + '');
      elem.setAttribute("data-year", this.options.year + '');
      elem.setAttribute("data-btn", "next");
      elem.innerHTML = "&gt;";
      //add prev button span to header div
      div.appendChild(elem);
    }

    //add header div to container
    container.appendChild(div);

    //-------------------------- Body ------------------

    //body div
    div = document.createElement("div");
    div.setAttribute("class", "calendar-body");
    div.appendChild(table);

    //add body div to container div
    container.appendChild(div);

    //return container
    return container;
  }

  /**
   * this function will create month table.
   *
   * @return html
   * @param this.options
   */
  createMonthTable(): HTMLTableElement {
    let table = document.createElement("table");
    let tr = document.createElement("tr");

    let td: HTMLTableDataCellElement;
    //create 1st row for the day letters
    for (let c = 0; c <= 6; c++) {
      td = document.createElement("td");
      td.innerHTML = this.dayNameRu.d[c];
      tr.appendChild(td);
    }
    table.appendChild(tr);

    //create 2nd row for dates
    tr = document.createElement("tr");

    //blank td
    let c: number;
    for (c = 0; c <= 6; c++) {
      if (c === this._calendar.firstDayIndex) {
        break;
      }
      td = document.createElement("td");
      tr.appendChild(td);
    }

    //remaing td of dates for the 2nd row
    let count = 1;
    while (c <= 6) {
      td = document.createElement("td");
      td.innerHTML = count + '';
      if (this._calendar.today.date === count && this._calendar.today.monthIndex === this._calendar.monthIndex && this.options.highlightToday) {
        td.setAttribute("class", "calendar-today-date");
      }
      if (this.options.date === count && this.options.month === this._calendar.monthIndex && this.options.highlightTargetDate) {
        td.setAttribute("class", "calendar-target-date");
      }
      tr.appendChild(td);
      count = count + 1;
      c++;
    }
    table.appendChild(tr);

    //create remaining rows
    for (let r = 3; r <= 7; r = r + 1) {
      tr = document.createElement("tr");
      for (c = 0; c <= 6; c = c + 1) {
        if (count > this._calendar.totalDays) {
          table.appendChild(tr);
          return table;
        }
        td = document.createElement('td');
        td.innerHTML = count + '';
        if (this._calendar.today.date === count && this._calendar.today.monthIndex === this._calendar.monthIndex && this.options.highlightToday) {
          td.setAttribute("class", "calendar-today-date");
        }
        if (this.options.date === count && this.options.month === this._calendar.monthIndex && this.options.highlightTargetDate) {
          td.setAttribute("class", "calendar-target-date");
        }
        count = count + 1;
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }

    return table;
  }


  // onClick() {
  //   var
  //     //get target dom object reference
  //     targetDomObject = document.querySelector(''),
  //
  //     //other variables
  //     date, month, year, btn, option, dateObj;
  //
  //   //prev-next button click
  //   //extra checks to make sure object exists and contains the class of interest
  //   if ((targetDomObject) && (targetDomObject.classList) && (targetDomObject.classList.contains("calendar-prev-next-btn"))) {
  //     date = parseInt(targetDomObject.getAttribute("data-date"));
  //     month = parseInt(targetDomObject.getAttribute("data-month"));
  //     year = parseInt(targetDomObject.getAttribute("data-year"));
  //     btn = targetDomObject.getAttribute("data-btn");
  //     option = JSON.parse(targetDomObject.parentElement.getAttribute("data-option"));
  //
  //     if (btn === "prev") {
  //       month = month - 1;
  //       if (month < 0) {
  //         year = year - 1;
  //         month = 11;
  //       }
  //     } else if (btn === "next") {
  //       month = month + 1;
  //       if (month > 11) {
  //         year = year + 1;
  //         month = 0;
  //       }
  //     }
  //
  //     option.date = date;
  //     option.month = month;
  //     option.year = year;
  //
  //     // this(option);
  //   }
  //
  //   //month click
  //   //extra checks to make sure object exists and contains the class of interest
  //   if ((targetDomObject) && (targetDomObject.classList) && (targetDomObject.classList.contains("calendar-span-month-year"))) {
  //     option = JSON.parse(targetDomObject.parentElement.getAttribute("data-option"));
  //     dateObj = new Date();
  //
  //     option.date = dateObj.getDate();
  //     option.month = dateObj.getMonth();
  //     option.year = dateObj.getFullYear();
  //
  //
  //   }
  // }

  nextMonth(target: HTMLSpanElement): string {
    let dateStr = target.getAttribute('data-date')
    let monthStr = target.getAttribute('data-month')
    let yearStr = target.getAttribute('data-year')

    if (dateStr !== null && monthStr !== null && yearStr !== null) {
      let date = +dateStr
      let month = +monthStr
      let year = +yearStr

      month++
      if (month > 11) {
        year = year + 1
        month = 0
      }

      this.options.date = date
      this.options.month = month
      this.options.year = year

      return this.drawCalendar()
    }

    return ''
  }

  prevMonth(target: HTMLSpanElement): string {
    let dateStr = target.getAttribute('data-date')
    let monthStr = target.getAttribute('data-month')
    let yearStr = target.getAttribute('data-year')

    if (dateStr !== null && monthStr !== null && yearStr !== null) {
      let date = +dateStr
      let month = +monthStr
      let year = +yearStr

      month--
      if (month < 0) {
        year = year - 1
        month = 11
      }

      this.options.date = date
      this.options.month = month
      this.options.year = year

      return this.drawCalendar()
    }

    return ''
  }

  newActiveDate(target: HTMLTableDataCellElement): string {
    let date = +target.innerHTML
    if (date !== 0) {
      this.options.date = date

      target.classList.remove('calendar-target-date')

      this.dateChanged.emit(new Date(this.options.year, this.options.month, this.options.date))

      return this.drawCalendar()
    }

    return ''
  }

  generatePointDate(): string {
    let str: string

    let date = new Date(this._calendar.year, this._calendar.month, this._calendar.date);

    return `${date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()}.${date.getMonth() >= 10 ? date.getMonth() : '0' + date.getMonth()}.${date.getFullYear()}`
  }
}



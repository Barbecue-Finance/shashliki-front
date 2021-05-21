import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    // value: 123.57

    let isNegative = false
    if (value < 0) {
      value *= -1
      isNegative = true
    }

    if (value === 0) {
      return '0'
    }

    let str = ''

    let remainder = value - Math.round(value)

    if (Math.abs(remainder) > 0.0001) {
      str += ', ' + ~~(remainder * 100)
    }

    let int = ~~value

    let digits = 1

    while (int > 0) {
      let digit = int % 10
      int = ~~(int / 10)

      str = digit + str

      if (digits % 3 === 0) {
        str = ' ' + str
      }

      digits++
    }

    return isNegative ? '- ' + str : str
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tankaKbn'
})
export class TankaKbnPipe implements PipeTransform {

  transform(value: string): string {
    let tKbn: string;
    switch (value) {
      case "0":
      tKbn = '不明';
      break;
      case "1":
      tKbn = '通販一般価格';
      break;
      case "2":
      tKbn = '道場会員価格';
      break;
      case "3":
      tKbn = '代理店法人価格';
      break;
      case "4":
      tKbn = 'ＦＣ価格';
      break;
      case "5":
      tKbn = '代理店－５%';
      break;
      // default:
      // tKbn = '通販一般価格';
      // break;
    }
    return tKbn;
  }

}

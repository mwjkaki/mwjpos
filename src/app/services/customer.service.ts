import { Injectable } from '@angular/core';

export interface SelVal {
  value: string;
  viewValue: string;
}
export interface Cust {
  code: string;
  tkbn: string;
  zkbn: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  public sval: SelVal[]= new Array();
  public cust: Cust[]= new Array();

  constructor() { }
  reset() {
    this.sval = new Array();
    this.cust = new Array();　
  }
  addSval(psval:SelVal) : void { this.sval.push(psval);}
  addCust(pcust:Cust) : void { this.cust.push(pcust);}
  getTkbn(pcode:string): string {
　　　let i:number = this.cust.findIndex(k => k.code==pcode)
　　　return this.cust[i].tkbn;
  }
  getZkbn(pcode:string): string {
　　　let i:number = this.cust.findIndex(k => k.code==pcode)
　　　return this.cust[i].zkbn;
  }
  getSval(){ return this.sval; }
　getCust(){ return this.cust; }
}

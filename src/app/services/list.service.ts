import { Injectable } from '@angular/core';

export class List {
  gds: string;
  prc: number[];
  cnt: number;
}

@Injectable({
  providedIn: 'root'
})
export class ListService {
  public sum:number = 0;
  public zei:number = 0;
  public rat:number = 8;
  public items: List[]= new Array();
  private tkbn:number = 1;
  private zkbn:string = "1";
  constructor() { }
  addList(Gds :string, Prc :number[]) {
    let i:number = this.items.findIndex(k => k.gds==Gds)
    if  (i == -1) {
      Prc[0] = Prc[this.tkbn]; 　
      let adGds:List = {gds:Gds,prc:Prc,cnt:1};
      this.items.push(adGds);
    } else {
      this.items[i].cnt += 1;
    }
    this.calc_sum()
  }
  clear() {
    this.sum = 0;
    this.zei = 0;
    this.items = new Array();　
  }
  getList() :any { return this.items; }
  setKbn(tkbn:number,zkbn:string) :void {
    this.tkbn = tkbn;
    this.zkbn = zkbn;
    for(let i = 0; i < this.items.length; i++) {
      this.items[i].prc[0] = this.items[i].prc[this.tkbn];
    }
    this.calc_sum();
  }
  updList(i :number) :void {
    // this.sum -= this.items[i].prc * this.items[i].cnt;
    this.calc_sum();
    // this.sum += this.items[i].sum;　　
  }
  delList(i :number) :void {
    this.items.splice(i,1);
    this.calc_sum();
  }
  disCount(r :number) :void {
    for(let i = 0; i < this.items.length; i++) {
      this.items[i].prc[0] = this.items[i].prc[this.tkbn] - Math.floor(this.items[i].prc[this.tkbn] * r / 100);
    }
    this.calc_sum();
  }
  calc_sum() :void {
    this.sum=0;
    this.zei=0;
    for(let i = 0; i < this.items.length; i++) {
      this.sum += this.items[i].prc[0] * this.items[i].cnt;
    }
    if(this.zkbn = "0"){
      this.zei = Math.floor(this.sum * this.rat / 100);
      this.sum = this.sum + this.zei;
    }else{
      this.zei = Math.floor(this.sum * this.rat / (100 + this.rat));
    }
  }
}

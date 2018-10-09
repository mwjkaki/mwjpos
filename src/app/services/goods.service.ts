import { Injectable } from '@angular/core';

export class Ginfo {
  gcode: string;
  gname: string;
  price: number[];
  stock: number;
}

export class Goods {
  categ: string;
  ginfo: Ginfo[];
}

@Injectable({
  providedIn: 'root'
})
export class GoodsService {
  public goods: Goods[]= [
    {
      categ: "ng",
      ginfo: [
        {
          gcode: "test",
          gname: "テスト",
          price: [1000],
          stock: 10,
        },
        {
          gcode: "tes2",
          gname: "テスト",
          price: [1111],
          stock: 20,
        }
        ,{
          gcode: "test3",
          gname: "テスト",
          price: [1300],
          stock: 10,
        }
      ]
    },
    {  categ: "lg2",
    　　ginfo: [
      {
        gcode: "test",
        gname: "テスト",
        price: [1000],
        stock: 10,
      },
      {
        gcode: "tes2",
        gname: "テスト",
        price: [1111],
        stock: 20,
      }
      ,{
        gcode: "test3",
        gname: "テスト",
        price: [1300],
        stock: 10,
      }
    ]
  }
];
　constructor() { }
  resetGoods() : void { this.goods = new Array(); }
  getGoods(){ return this.goods; }
  addGoods(pgoods:Goods) : void {
　　let i:number = this.goods.findIndex(obj => obj.categ == pgoods.categ);
    if ( i > -1 ){
　　　　this.goods[i].ginfo.push(pgoods.ginfo[0]);　　　
    }else{
　　　　this.goods.push(pgoods);
    }
  }
}

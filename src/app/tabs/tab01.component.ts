import { Component, OnInit } from '@angular/core';
import { GoogleDriveProvider } from '../providers/googledrive';
import { Ginfo,Goods,GoodsService } from '../services/goods.service';
import { SelVal,Cust, CustomerService } from '../services/customer.service';

@Component({
  selector: 'ons-page',
  templateUrl: './tab01.component.html',
  providers: [ GoogleDriveProvider ]
})

export class Tab01Component implements OnInit {
  gcodes: Array<any>;
  dataId: string;
  sheeId: string;
  file: string;
  rdsel: string;
  shop: string;
  constructor(　public goodsservice: GoodsService,
    public custservice: CustomerService,
    public gDrive: GoogleDriveProvider, ) {

    }
    ngOnInit() {
    }

    onChangeInput(evt) {
      this.file = evt.target.files[0];
    }
    readMst(){
      switch (this.rdsel) {
        case "1":
           this.readGdrive();
　        break;
        case "2":
　        this.readText();
　        break;
      }
    }
    readText(){
      this.fileToText(this.file)
      .then(text => {
        const splitted: string[] = text.split(',');
        this.goodsservice.resetGoods();
        let adInf: Ginfo[];
        let adBtn: Goods;
        for ( let i=140;i<Object.keys(splitted).length-1;i=i+5 ){
          adInf = [{ gcode:splitted[i],gname:'test',price:[+splitted[i+1]],stock:+splitted[i+2] }];
          adBtn = { categ:'大会販売品',ginfo:adInf} ;
          this.goodsservice.addGoods(adBtn);
        }
        this.custservice.reset();
        let adSel: SelVal;
        let adCus: Cust;
        adSel = { value:splitted[3], viewValue:splitted[6]}
        this.custservice.addSval(adSel);
        adCus = { code:splitted[3],tkbn:"1",zkbn:"1" };
        this.custservice.addCust(adCus);
      })
      .catch(err => console.log(err));
    }
    fileToText(file): Promise<string> {
      const reader = new FileReader();
      reader.readAsText(file,'shift-jis');
      return new Promise((resolve, reject) => {
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = () => {
          reject(reader.error);
        };
      });
    }
    readGdrive(){
      let splitted: string[] = this.shop.split(',');
      this.dataId = splitted[0];
      this.sheeId = splitted[1];
      // this.dataId = '/1OOqrmi9jhu1q1MGQKvE2F8uujtWeyXTtTXbrjD0gYlw';
      // this.sheeId = '/o9b4p2v';
      // oaqn5np
      this.gDrive.load( this.dataId ,this.sheeId)
      .then( ( data :any) => {
        this.goodsservice.resetGoods();
        let adInf: Ginfo[];
        let adBtn: Goods;
        for ( let i=0;i<data.length; i++ ){
          adInf = [{ gcode:data[i].gcode,gname:data[i].gname,price:[0,+data[i].num1,+data[i].num2,+data[i].num3,+data[i].num4,+data[i].num5],stock:+data[i].zai }];
          adBtn = { categ:data[i].categ,ginfo:adInf} ;
          this.goodsservice.addGoods(adBtn);
        }
        this.gcodes = data;
      }, (error) => {
        console.log( error );
      });
      this.sheeId = splitted[2];
      // this.sheeId = '/o8qzhy4';
      this.gDrive.load( this.dataId ,this.sheeId)
      .then( ( data:any ) => {
        this.custservice.reset();
        let adCus: Cust;
        let adSel: SelVal;
        for ( let i=0;i<data.length; i++ ){
          adSel = { value:data[i].code, viewValue:data[i].name}
          adCus = { code:data[i].code,tkbn:data[i].tkbn,zkbn:data[i].zkbn };
          this.custservice.addSval(adSel);
          this.custservice.addCust(adCus);
        }
        this.gcodes = data;
      }, (error) => {
        console.log( error );
      });
    }
  }

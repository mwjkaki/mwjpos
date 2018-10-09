import { Component, OnInit } from '@angular/core';
import { GoogleDriveProvider } from '../providers/googledrive';
import { Ginfo,Goods,GoodsService } from '../services/goods.service';

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
  constructor(　public goodsservice: GoodsService,
    　　　　　　 public gDrive: GoogleDriveProvider, ) {

  }
  ngOnInit() {
  }

  onChangeInput(evt) {
    this.file = evt.target.files[0];
  }
  readText(){
    this.fileToText(this.file)
    .then(text => {
      let splitted: string[] = text.split(',');
      this.goodsservice.resetGoods();
      var adInf: Ginfo[];
      var adBtn: Goods;
      for ( var i=140;i<Object.keys(splitted).length-1;i=i+5 ){
        adInf = [{ gcode:splitted[i],gname:'test',price:[+splitted[i+1]],stock:+splitted[i+2] }];
        adBtn = { categ:'大会販売品',ginfo:adInf} ;
        this.goodsservice.addGoods(adBtn);
      }
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
    this.dataId = '/1OOqrmi9jhu1q1MGQKvE2F8uujtWeyXTtTXbrjD0gYlw';
　　this.sheeId = '/o9b4p2v'
    this.gDrive.load( this.dataId ,this.sheeId)
      .then( ( data ) => {
        this.goodsservice.resetGoods();
        var adInf: Ginfo[];
        var adBtn: Goods;
　　　　 for ( var i=0;i<data.length - 1; i++ ){
  　　　　　 adInf = [{ gcode:data[i].gcode,gname:data[i].gname,price:[+data[i].num1,+data[i].num2,+data[i].num3],stock:+data[i].zai }];
            adBtn = { categ:data[i].categ,ginfo:adInf} ;
            this.goodsservice.addGoods(adBtn);
　　　　 }
        this.gcodes = data;
      }, (error) => {
        console.log( error );
      });
  }
}

import { Injectable } from '@angular/core';
import { List } from '../services/list.service';

export class Hist {
  index: number;
  custo: string;
  payty: string;
  times: Date;
  memos: string;
  prsum: number;
  detas: List[];
}
interface Gdscnt {
  gdspr: string;
  count: number;
}
export class Sum {
  custo: string;
  gprcs: Gdscnt[];
}

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  public hists: Hist[] = new Array();
  public sum: Sum[] = new Array();
  // public hists: Hist[] = [{index:1,custo:"11",times:new Date(),memos:"めも",prsum:0,detas:new Array()}];
  constructor() { }
  resetHists() : void { this.hists = new Array();
    this.sum = new Array(); }
    getHists(){ return this.hists; }
    addHists(phists:Hist) : void { this.hists.push(phists);
      this.calc_sum() }
      updHist(i :number,phists:Hist) {
        this.hists[i].memos = phists.memos;
        this.hists[i].custo = phists.custo;
        this.hists[i].payty = phists.payty;　　
        this.hists[i].prsum = phists.prsum;　
        this.hists[i].detas = phists.detas;　
        this.calc_sum()　
      }
      chkHist(i :number){
        if (this.hists[i]){return true}
        else { return false }
      }
      getHist(i :number){ return this.hists[i]; }
      delHist(i :number): void {this.hists.splice(i,1);this.calc_sum() }
      getIndex(){
        if (this.hists.length == 0)　{return 1;}　
        else { return this.hists[this.hists.length-1].index + 1;}
      }
      private calc_sum(){
        let adSum:Sum;
        let adCnt:Gdscnt;
        let adCnts:Gdscnt[];
        let i:number
        let j:number
        let k:number
        let l:number

        this.sum = new Array();
        for( i = 0; i < this.hists.length; i++) {

          j = this.sum.findIndex(o => o.custo==this.hists[i].custo +'_'+ this.hists[i].payty)
          if  (j == -1) {
            adCnts = new Array();
            for(k = 0; k < this.hists[i].detas.length; k++) {
              adCnt = {gdspr:this.hists[i].detas[k].gds + '_' + this.hists[i].detas[k].prc[0].toString(),
              count:this.hists[i].detas[k].cnt};
              adCnts.push(adCnt);
              adSum = {custo:this.hists[i].custo + this.hists[i].payty,
                gprcs:adCnts};
              }
              this.sum.push(adSum);
            } else {
              for(k = 0; k < this.hists[i].detas.length; k++) {
                l = this.sum[j].gprcs.findIndex(o => o.gdspr==this.hists[i].detas[k].gds +'_'+ this.hists[i].detas[k].prc[0])
                if  (l == -1) {
                  adCnt = {gdspr:this.hists[i].detas[k].gds + '_' + this.hists[i].detas[k].prc[0].toString(),
                  count:this.hists[i].detas[k].cnt};
                  this.sum[j].gprcs.push(adCnt);
                } else {
                  this.sum[j].gprcs[l].count += this.hists[i].detas[k].cnt;
                }
              }
            }
          }
        }
      }

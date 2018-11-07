import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit, AfterViewInit ,Renderer } from '@angular/core';
import { Goods, GoodsService } from '../services/goods.service';
import { List, ListService } from '../services/list.service';
import { Hist, HistoryService } from '../services/history.service';
import { SelVal,Cust, CustomerService } from '../services/customer.service';
import { TableDataSource, ValidatorService } from 'angular4-material-table';
import { GdslistValidatorService } from '../services/gdslist-validator.service';
import { Tab03Component } from './tab03.component';

@Component({
  selector: 'ons-page',
  providers: [
    Tab03Component,
    {provide: ValidatorService, useClass: GdslistValidatorService }
  ],
  templateUrl: './tab02.component.html'
})
export class Tab02Component implements OnInit,AfterViewInit {
  public azu:number = 10000;
  public neb:number = 10;
  public mem:string;
  public cus:string = "119908";
  public tkbn:string = "1";
  public zkbn:string = "1";
  public payt:string;
  constructor(public goodsservice: GoodsService,
    public listservice: ListService,
    public custservice: CustomerService,
    private gdsListValidator: ValidatorService,
    private histservice: HistoryService,
    private tab03comp:Tab03Component,
    private renderer: Renderer
  ) { }
  displayedColumns = ['gds', 'prc', 'cnt', 'sum', 'actionsColumn'];
  @Input() gdsList = this.listservice.items ;
  @Output() gdsListChange = new EventEmitter<List[]>();
  // @ViewChild('elAzu') elAzu: ElementRef;

  dataSource: TableDataSource<List>;
  ngOnInit() {
    this.dataSource = new TableDataSource<any>(this.gdsList, List, this.gdsListValidator);
    this.dataSource.datasourceSubject.subscribe(gdsList => this.gdsListChange.emit(gdsList));
  }
  ngAfterViewInit() {
    // let el: HTMLElement = this.elAzu.nativeElement as HTMLElement;
    // this.renderer.invokeElementMethod(el, 'focus');
    // 　this.cdRef.detectChanges();
    // el.focus();
    // el.blur();
  }
  addList(Gds :string, Prc :number[]) {
    this.listservice.addList(Gds,Prc);
    this.refresh();
  }
  delList(i :number) {
    this.listservice.delList(i);
    this.refresh();
  }
  disCount(i :number) {
    this.listservice.disCount(i);
    this.refresh();
  }
  updList(i :number) {
    this.listservice.updList(i);
    this.refresh();
  }
  setKbn(event){
    this.tkbn = this.custservice.getTkbn(event.value);
    this.zkbn = this.custservice.getZkbn(event.value);
    this.listservice.setKbn(+this.tkbn,this.zkbn);
  }
  calc(){
    this.listservice.calc_sum();
  }
  clear(){
    this.listservice.clear();
    this.refresh();
  }
  addHist(){
    let hist:Hist = {index:this.histservice.getIndex(),custo:this.cus,payty:this.payt,times:new Date(),memos:this.mem,prsum:this.listservice.sum,detas:this.gdsList};
    this.histservice.addHists(hist);
    this.tab03comp.refresh();
    this.listservice.clear();
  }
  private refresh(){
    this.dataSource = new TableDataSource<any>(this.listservice.items, List, this.gdsListValidator);
  }
}

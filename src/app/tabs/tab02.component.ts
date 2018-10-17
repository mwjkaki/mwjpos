import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Goods, GoodsService } from '../services/goods.service';
import { List, ListService } from '../services/list.service';
import { SelVal,Cust, CustomerService } from '../services/customer.service';
import { TableDataSource, ValidatorService } from 'angular4-material-table';
import { GdslistValidatorService } from '../services/gdslist-validator.service';

@Component({
  selector: 'ons-page',
  providers: [
    {provide: ValidatorService, useClass: GdslistValidatorService }
  ],
  templateUrl: './tab02.component.html',
  styleUrls: ['./tab02.component.scss']
})
export class Tab02Component implements OnInit,AfterViewInit {
  public azu:number = 10000;
  public neb:number = 10;
  public cus:string = "119908";
  public tkbn:string = "1";
  public zkbn:string = "1";
  private rate:number;
  constructor(public goodsservice: GoodsService,
    public listservice: ListService,
    public custservice: CustomerService,
    private gdsListValidator: ValidatorService
  ) {this.rate = this.listservice.rat }
  displayedColumns = ['gds', 'prc', 'cnt', 'sum', 'actionsColumn'];
  @Input() gdsList = this.listservice.items ;
  @Output() gdsListChange = new EventEmitter<List[]>();
  @ViewChild('elAzu') elAzu: ElementRef;

  dataSource: TableDataSource<List>;
  ngOnInit() {
    this.dataSource = new TableDataSource<any>(this.gdsList, List, this.gdsListValidator);
    this.dataSource.datasourceSubject.subscribe(gdsList => this.gdsListChange.emit(gdsList));
  }
  ngAfterViewInit() {
    let el: HTMLElement = this.elAzu.nativeElement as HTMLElement;
    el.blur();
  }
  addList(Gds :string, Prc :number[]) {
    this.listservice.addList(Gds,Prc);
    // this.dataSource.updateDatasource(this.listservice.items);
    this.dataSource = new TableDataSource<any>(this.listservice.items, List, this.gdsListValidator);
  }
  delList(i :number) {
    this.listservice.delList(i);
    this.dataSource = new TableDataSource<any>(this.listservice.items, List, this.gdsListValidator);
  }
  disCount(i :number) {
    this.listservice.disCount(i);
    this.dataSource = new TableDataSource<any>(this.listservice.items, List, this.gdsListValidator);
  }
  updList(i :number) {
    this.listservice.updList(i);
    this.dataSource = new TableDataSource<any>(this.listservice.items, List, this.gdsListValidator);
  }
  clear(){
    this.listservice.clear();
    this.dataSource = new TableDataSource<any>(this.listservice.items, List, this.gdsListValidator);
  }
  setKbn(event){
    this.tkbn = this.custservice.getTkbn(event.value);
    this.zkbn = this.custservice.getZkbn(event.value);
    this.listservice.setKbn(+this.tkbn,this.zkbn);
  }
}

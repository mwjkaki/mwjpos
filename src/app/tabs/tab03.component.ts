import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TableDataSource, ValidatorService } from 'angular4-material-table';
import { Hist, HistoryService } from '../services/history.service';
import { HistValidatorService } from '../services/hist-validator.service';

@Component({
  selector: 'ons-page',
  providers: [
    {provide: ValidatorService, useClass: HistValidatorService }
  ],
  templateUrl: './tab03.component.html'
})
export class Tab03Component implements OnInit {
  displayedColumns = ['index', 'custo', 'times', 'memos', 'prsum', 'actionsColumn'];
  @Input() purHist = this.histservice.hists ;
  @Output() purHistChange = new EventEmitter<Hist[]>();
  dataSource: TableDataSource<Hist>;

  constructor(
    public histservice: HistoryService,
　  private histValidator: ValidatorService
  ) {}

  ngOnInit() {
    this.dataSource = new TableDataSource<any>(this.purHist, Hist, this.histValidator);
　　this.dataSource.datasourceSubject.subscribe(purHist => this.purHistChange.emit(purHist));
  }
  refresh(){
  　  this.dataSource = new TableDataSource<any>(this.purHist, Hist, this.histValidator);
  }
}

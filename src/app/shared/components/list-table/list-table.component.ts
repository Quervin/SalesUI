import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { City, Country, Paginate, State, Table } from 'src/app/interfaces';

@Component({
  selector: 'shared-list-table',
  templateUrl: './list-table.component.html',
  styles: [
  ]
})
export class ListTableComponent {

  get columns() {
     const data = this.columnsData.map( columns => {
      return columns.columnHeater;
    });
    data.push('actions');
    return data;
  }

  get dataSource() {
    return new MatTableDataSource<Country|State|City>(this.list);
  }

  get pageItems() {
    return 10;
  }

  public seachInput = new FormControl('');

  public paginate: Paginate = {
    page: 1,
    filter: ''
  }

  @Input()
  public list: any[] = [];

  @Input()
  public columnsData: Table[] = [];

  @Input()
  public showDetails: boolean = true;

  @Input()
  public page: number = 1;

  @Input()
  public total: number = 0;

  @Output()
  public onGotoDetails: EventEmitter<number> = new EventEmitter();

  @Output()
  public onGotoUpdate: EventEmitter<number> = new EventEmitter();

  @Output()
  public onDelete: EventEmitter<number> = new EventEmitter();

  @Output()
  public onChangePage: EventEmitter<Paginate> = new EventEmitter();

  @Output()
  public onFilter: EventEmitter<Paginate> = new EventEmitter();

  @Output()
  public onCleanFilter: EventEmitter<number> = new EventEmitter();

  emitPage(pageNum : number) {
    this.page = pageNum;

    this.paginate.page = this.page;
    this.paginate.filter = this.seachInput.value || '';

    this.onChangePage.emit(this.paginate);
  }

  emitSearch() {
    this.paginate.page = this.page;
    this.paginate.filter = this.seachInput.value || '';
    this.onFilter.emit(this.paginate);
  }

  emitCleanFilter() {
    this.page = 1;
    this.seachInput.setValue('');
    this.onCleanFilter.emit(1);
  }

  emitDetails(id : number) {
    this.onGotoDetails.emit(id);
  }

  emitUpdate(id : number) {
    this.onGotoUpdate.emit(id);
  }

  emitDelete(id : number) {
    this.onDelete.emit(id);
  }

}

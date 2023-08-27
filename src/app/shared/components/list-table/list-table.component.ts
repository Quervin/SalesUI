import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Table } from 'src/app/interfaces';

@Component({
  selector: 'shared-list-table',
  templateUrl: './list-table.component.html',
  styles: [
  ]
})
export class ListTableComponent  {

  @Output()
  public onGotoDetails: EventEmitter<number> = new EventEmitter();

  @Output()
  public onGotoUpdate: EventEmitter<number> = new EventEmitter();

  @Output()
  public onDelete: EventEmitter<number> = new EventEmitter();

  get columns() {
     const data = this.columnsData.map( columns => {
      return columns.columnHeater;
    });
    data.push('actions')
    return data;
  }

  @Input()
  public list: any[] = [];

  @Input()
  public columnsData: Table[] = [];

  @Input()
  public showDetails: boolean = true;

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

import {Component, OnInit, ViewChild} from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

export interface Pigeon {
  bandNo: string;
  year: number;
  name: string;
}

const pigeons: Pigeon[] = [
  {bandNo: '123/2018', year: 2018, name: 'Billy'},
  {bandNo: '124/2018', year: 2016, name: 'Abe'},
];

@Component({
  selector: 'app-pigeon-datatable',
  templateUrl: './pigeon-datatable.component.html',
  styleUrls: ['./pigeon-datatable.component.scss']
})
export class PigeonDatatableComponent implements OnInit {
  columnsToDisplay: string[] = ['bandNo', 'year', 'name'];
  dataSource = new MatTableDataSource(pigeons);

  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

}

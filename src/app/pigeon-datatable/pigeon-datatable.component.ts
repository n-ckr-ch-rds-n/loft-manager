import {Component, OnInit, ViewChild} from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import {Pigeon} from '../pigeon';

const pigeons: Pigeon[] = [
  {bandNo: '123/2018', year: 2018, name: 'Billy', color: 'blue',
    sex: 'cock', strain: 'alabaster', loft: 'Greenaway', sire: '145',
    dam: 'trew', active: true, comments: 'yo yo this is a cool pigeon'},
  {bandNo: '123/2018', year: 2018, name: 'Abe', color: 'blue',
    sex: 'cock', strain: 'alabaster', loft: 'Greenaway', sire: '145',
    dam: 'trew', active: true, comments: 'yo yo this is a cool pigeon'},
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

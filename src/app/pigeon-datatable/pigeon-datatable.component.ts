import {Component, OnInit, ViewChild} from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import {Pigeon} from '../pigeon';

const pigeons: Pigeon[] = [
  {bandNo: '123/2018', year: 2018, name: 'Billy', color: 'blue',
    sex: 'cock', strain: 'alabaster', loft: 'Greenaway', sire: '145',
    dam: 'trew', active: true, comments: 'yo yo this is a cool pigeon'},
  {bandNo: '123/2018', year: 2018, name: 'Abe', color: 'blue',
    sex: 'cock', strain: 'alabaster', loft: 'Parkins', sire: '145',
    dam: 'trew', active: true, comments: 'abe is cool too'},
];

@Component({
  selector: 'app-pigeon-datatable',
  templateUrl: './pigeon-datatable.component.html',
  styleUrls: ['./pigeon-datatable.component.scss']
})

export class PigeonDatatableComponent implements OnInit {
  columnsToDisplay: string[] = ['bandNo', 'year', 'name'];
  dataSource = new MatTableDataSource(pigeons);
  selectedPigeon: Pigeon = pigeons[0];

  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  select(selectedPigeon: Pigeon) {
    this.selectedPigeon = selectedPigeon;
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

}

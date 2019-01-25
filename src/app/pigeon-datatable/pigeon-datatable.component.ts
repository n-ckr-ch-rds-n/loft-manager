import {Component, OnInit, ViewChild} from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import {Pigeon} from '../pigeon';

import {ALL_PIGEONS_QUERY, AllPigeonsQueryResponse} from '../graphql';
import {Apollo} from 'apollo-angular';

export interface SelectablePigeon extends Pigeon {
  selected: boolean;
}

@Component({
  selector: 'app-pigeon-datatable',
  templateUrl: './pigeon-datatable.component.html',
  styleUrls: ['./pigeon-datatable.component.scss']
})

export class PigeonDatatableComponent implements OnInit {
  columnsToDisplay: Array<keyof Pigeon> = ['bandNo', 'year', 'name'];
  allPigeons: Pigeon[] = [];
  dataSource: MatTableDataSource<Pigeon>;
  selectedPigeon: SelectablePigeon;
  loading = true;
  selectablePigeons: SelectablePigeon[];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private apollo: Apollo) { }

  select(selectedPigeon: SelectablePigeon) {
    this.selectedPigeon.selected = false;
    this.selectedPigeon = selectedPigeon;
    this.selectedPigeon.selected = true;
  }

  ngOnInit() {
    this.apollo.watchQuery<AllPigeonsQueryResponse>({
      query: ALL_PIGEONS_QUERY
    }).valueChanges.subscribe((response) => {
      this.allPigeons = response.data.allPigeons;
      this.selectablePigeons = [...this.allPigeons].map(pigeon => ({...pigeon, selected: false}));
      this.dataSource = new MatTableDataSource(this.selectablePigeons);
      this.loading = response.data.loading;
      this.selectedPigeon = this.selectablePigeons[0];
      this.selectedPigeon.selected = true;
      this.dataSource.sort = this.sort;
    });
  }

}

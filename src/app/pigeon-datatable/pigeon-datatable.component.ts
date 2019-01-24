import {Component, OnInit, ViewChild} from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import {Pigeon} from '../pigeon';

import {ALL_PIGEONS_QUERY, AllPigeonsQueryResponse} from '../graphql';
import {Apollo} from 'apollo-angular';

@Component({
  selector: 'app-pigeon-datatable',
  templateUrl: './pigeon-datatable.component.html',
  styleUrls: ['./pigeon-datatable.component.scss']
})

export class PigeonDatatableComponent implements OnInit {
  columnsToDisplay: Array<keyof Pigeon> = ['bandNo', 'year', 'name'];
  allPigeons: Pigeon[] = [];
  dataSource: MatTableDataSource<Pigeon>;
  selectedPigeon: Pigeon;
  loading = true;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private apollo: Apollo) { }

  select(selectedPigeon: Pigeon) {
    this.selectedPigeon = selectedPigeon;
  }

  ngOnInit() {
    this.apollo.watchQuery<AllPigeonsQueryResponse>({
      query: ALL_PIGEONS_QUERY
    }).valueChanges.subscribe((response) => {
      this.allPigeons = response.data.allPigeons;
      this.dataSource = new MatTableDataSource(this.allPigeons);
      this.loading = response.data.loading;
      this.selectedPigeon = this.allPigeons[0];
      this.dataSource.sort = this.sort;
    });
  }

}

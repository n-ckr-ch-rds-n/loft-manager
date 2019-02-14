import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Pigeon} from '../pigeon';
import {ALL_PIGEONS_QUERY, AllPigeonsQueryResponse} from '../graphql';
import {Apollo} from 'apollo-angular';
import {Router} from '@angular/router';
import {PigeonDetailsComponent} from '../pigeon-details/pigeon-details.component';
import {AddPigeonComponent} from '../add-pigeon/add-pigeon.component';
import {AuthenticatedUser} from '../services/authenticated.user';

export interface SelectablePigeon extends Pigeon {
  selected: boolean;
}

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})

export class DatatableComponent implements OnInit {
  columnsToDisplay: Array<keyof Pigeon> = ['bandNo', 'year', 'name', 'color', 'sex', 'strain', 'loft', 'sire', 'dam'];
  allPigeons: Pigeon[] = [];
  dataSource: MatTableDataSource<Pigeon>;
  selectedPigeon: SelectablePigeon;
  loading = true;
  selectablePigeons: SelectablePigeon[];

  @Input()
  user: AuthenticatedUser;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private apollo: Apollo,
              public router: Router,
              public dialog: MatDialog) {
  }

  select(selectedPigeon: SelectablePigeon) {
    this.selectedPigeon.selected = false;
    this.selectedPigeon = selectedPigeon;
    this.selectedPigeon.selected = true;
    this.router.navigate([`/pigeon/{${this.selectedPigeon.id}`]);
    const dialogRef = this.dialog.open(PigeonDetailsComponent, {
      width: 'auto',
      data: { selectedPigeon: this.selectedPigeon }
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  async ngOnInit() {
    this.apollo.watchQuery<AllPigeonsQueryResponse>({
      query: ALL_PIGEONS_QUERY,
      variables: {
        userId: this.user.id
      }
    }).valueChanges.subscribe((response) => {
      this.allPigeons = response.data.allPigeons;
      this.selectablePigeons = [...this.allPigeons].map(pigeon => ({...pigeon, selected: false}));
      this.dataSource = new MatTableDataSource(this.selectablePigeons);
      this.loading = response.data.loading;
      this.selectedPigeon = this.selectablePigeons[0];
      if (this.selectedPigeon) {this.selectedPigeon.selected = true; }
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  addPigeon() {
    const dialogRef = this.dialog.open(AddPigeonComponent, {
      width: 'auto',
      data: { selectedPigeon: this.selectedPigeon }
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

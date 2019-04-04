import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Pigeon} from '../pigeon';
import {ALL_PIGEONS_QUERY, AllPigeonsQueryResponse, NEW_PIGEON_SUBSCRIPTION} from '../graphql';
import {Apollo} from 'apollo-angular';
import {Router} from '@angular/router';
import {PigeonDetailsComponent} from '../pigeon-details/pigeon-details.component';
import {AddPigeonComponent} from '../add-pigeon/add-pigeon.component';
import {AuthenticatedUser} from '../services/authenticated.user';
import {MutationType} from './mutation.type';
import {startCase} from 'lodash';

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
    if (this.selectedPigeon) { this.selectedPigeon.selected = false; }
    this.selectedPigeon = selectedPigeon;
    this.selectedPigeon.selected = true;
    this.router.navigate([`/pigeon/{${this.selectedPigeon.id}`]);
    const dialogRef = this.dialog.open(PigeonDetailsComponent, {
      width: '600px',
      data: { selectedPigeon: this.selectedPigeon }
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  async ngOnInit() {
    const allPigeonsQuery = this.apollo.watchQuery<AllPigeonsQueryResponse>({
      query: ALL_PIGEONS_QUERY,
      variables: {
        userId: this.user.id
      }
    });

    allPigeonsQuery.subscribeToMore({
      document: NEW_PIGEON_SUBSCRIPTION,
      updateQuery: (previous, { subscriptionData }) => {
        const mutationType = subscriptionData.data.Pigeon.mutation;
        if (mutationType === MutationType.Deleted) {
          return { allPigeons: this.selectedPigeon
              ? previous.allPigeons.filter((pigeon) => pigeon.id !== this.selectedPigeon.id)
              : previous.allPigeons};
        } else if (mutationType === MutationType.Created) {
          const newPigeon = subscriptionData.data.Pigeon.node;
          return previous.allPigeons.find(pigeon => pigeon.id === newPigeon.id)
            ? { allPigeons : previous.allPigeons }
            : { allPigeons: [...previous.allPigeons, newPigeon] };
        }
      }
    });

    allPigeonsQuery.valueChanges
      .subscribe((response) => {
      this.selectablePigeons = response.data.allPigeons.map(pigeon => ({...pigeon, selected: false}));
      this.dataSource = new MatTableDataSource(this.selectablePigeons);
      this.loading = response.data.loading;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }

  addPigeon() {
    const dialogRef = this.dialog.open(AddPigeonComponent, {
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toColumnTitle(column: string): string {
    return startCase(column);
  }
}
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormArrayState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { fixtureResultEntered } from '../actions/fixture-list.actions';
import { playerSelected, sortOptionsChanged } from '../actions/table.actions';
import { Fixture } from '../fixtures/fixture';
import { Player } from '../players/player';
import { State } from '../reducers';
import * as fromAuth from '../reducers/auth.reducer';
import * as fromLeague from '../reducers/league-overview.reducer';
import { SortOptions } from '../table/table-calculation';
import { TableEntry } from '../table/table-entry';

@Component({
  selector: 'lm-league-overview',
  templateUrl: './league-overview.component.html',
  styleUrls: ['./league-overview.component.css']
})
export class LeagueOverviewComponent {
  public readonly selectedPlayer$: Observable<Player>;
  public readonly fixtures$: Observable<Fixture[]>;
  public readonly table$: Observable<TableEntry[]>;
  public upcomingfixturesForm$: Observable<FormArrayState<Fixture>>;
  public latestFixturesForm$: Observable<FormArrayState<Fixture>>;
  public readonly user$: Observable<Player>;

  constructor(private store: Store<State>) {
    this.selectedPlayer$ = this.store.select(fromLeague.getSelectedPlayer);
    this.upcomingfixturesForm$ = this.store.select(fromLeague.getUpcomingFixturesForm);
    this.latestFixturesForm$ = this.store.select(fromLeague.getLatestFixturesForm);
    this.table$ = this.store.select(fromLeague.getTable);
    this.user$ = this.store.select(fromAuth.getUser);
  }

  public sortTable(sortOptions: SortOptions) {
    this.store.dispatch(sortOptionsChanged({ sortOptions }));
  }

  public selectedPlayerChanged(playerName: string) {
    this.store.dispatch(playerSelected({ playerName }));
  }

  public onFixtureChange(fixture: Fixture) {
    this.store.dispatch(fixtureResultEntered({ fixture }));
  }
}

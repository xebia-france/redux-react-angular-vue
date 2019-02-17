import { TodoCategory } from 'App/domains/todo.model';
import { AppState } from 'App/reducers';

import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as todosActions from '../../actions/todo.actions';
import { getCategory } from '../../reducers';

@Component({
  selector: 'app-redux-todo-switch',
  template: `
    <app-ui-todo-switch
      [category]="category$ | async"
      (categoryChange)="categoryChange($event)">
    </app-ui-todo-switch>
  `
})
export class ReduxTodoSwitchComponent {
  category$ = this.store.pipe(select(getCategory));

  constructor(private store: Store<AppState>) { }

  categoryChange(category: TodoCategory) {
    this.store.dispatch(new todosActions.Category(category));
  }
}

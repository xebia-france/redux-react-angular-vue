import { AppState } from 'App/reducers';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as todosActions from '../../actions/todo.actions';

@Component({
  selector: 'app-redux-todo',
  template: `
    <div class="top">
      <app-redux-todo-add></app-redux-todo-add>
      <app-redux-todo-message></app-redux-todo-message>
    </div>

    <app-redux-todo-list></app-redux-todo-list>

    <div class="bottom">
      <app-redux-todo-status></app-redux-todo-status>
      <app-redux-todo-switch></app-redux-todo-switch>
    </div>
  `,
  styleUrls: ['./redux-todo.component.css']
})
export class ReduxTodoComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new todosActions.Load());
  }
}

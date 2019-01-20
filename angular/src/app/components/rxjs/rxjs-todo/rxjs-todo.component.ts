import { TODO_DEF_CAT } from 'App/domains/todo.config';
import { TodoCategory } from 'App/domains/todo.model';
import { isTextFree } from 'App/domains/todo.operators';
import { TodosService } from 'App/services/todos.service';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Component } from '@angular/core';

@Component({
  selector: 'app-rxjs-todo',
  template: `
    <button
      class="filter"
      [class.filter--disabled]="!filterEnabled"
      (click)="filterEnabled = !filterEnabled">
      <fa-icon icon="filter"></fa-icon>
    </button>

    <app-rxjs-todo-add
      [(text)]="text"
      (textChange)="textChange()"
      [disabled]="preventAdd$ | async">
    </app-rxjs-todo-add>

    <hr>
    <app-rxjs-todo-list [filter]="getFilter()" [category]="category"></app-rxjs-todo-list>

    <app-ui-todo-switch (categoryChange)="categoryChange($event)"></app-ui-todo-switch>

    <app-rxjs-todo-status></app-rxjs-todo-status>
    <!--<hr>

    <app-rxjs-todo-add
      [(text)]="text"
      (textChange)="textChange()"
      [disabled]="preventAdd$ | async">
    </app-rxjs-todo-add>-->
  `,
  styleUrls: ['./rxjs-todo.component.css']
})
export class RxjsTodoComponent {
  text = '';
  text$ = new BehaviorSubject<string>(this.text);

  category: TodoCategory = TODO_DEF_CAT;

  preventAdd$ = this.text$.pipe(
    switchMap(() => this.todosService.todos$),
    map(todos => !isTextFree(todos, this.text))
  );

  filterEnabled = false;

  constructor(private todosService: TodosService) { }

  textChange() {
    this.text$.next(this.text);
  }

  categoryChange(category: TodoCategory) {
    this.category = category;
  }

  getFilter() {
    return this.filterEnabled ? this.text : '';
  }
}

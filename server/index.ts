import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';

import cors from '@koa/cors';

import { add, get, getAll, remove, Todo, update } from './domains';

const app = new Koa();
const router = new Router();

router.post('/todos', (ctx, next) => {
  const todo: Partial<Todo> = ctx.request.body;
  ctx.body = add(todo);
});

router.get('/todos', (ctx, next) => {
  ctx.body = getAll();
});

router.get('/todos/:id', (ctx, next) => {
  const todoId: number = +ctx.params.id;
  ctx.body = get(todoId);
});

router.put('/todos/:id', (ctx, next) => {
  const todoId: number = +ctx.params.id;
  const todo: Todo = ctx.request.body;
  ctx.body = update({ ...todo, id: todoId });
});

router.delete('/todos/:id', (ctx, next) => {
  const todoId: number = +ctx.params.id;
  ctx.body = remove(todoId);
});

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  ;

const port = 3100;

app.listen(port);
console.log(`Koa is up and running on port ${port}...`);

/*
  The Koa app.
*/

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const data = require("./data");
const koaNunjucks = require('koa-nunjucks-2');
const path = require('path');
const markdown = require('nunjucks-markdown');
const marked = require('marked')

const app = new Koa();

// body parser to parse JSON
app.use(bodyParser());
// nunjucks
app.use(koaNunjucks({
  ext: 'html',
  path: path.join(__dirname, 'views'),
  nunjucksConfig: {
    trimBlocks: true
  },
  configureEnvironment: (env) => {
    markdown.register(env, marked);
  }
}));
// a router
const router = new Router();
app
  .use(router.routes())
  .use(router.allowedMethods());

router.get('/', async (ctx) => {
  await ctx.render('index');
});

/**
 * Returns the list of examples
 */
router.get('/examples/', async (ctx) => {
  ctx.body = await data.getExamples();
});

/**
 * Creates a new example and returns its id
 */
router.post('/examples', async (ctx) => {
  ctx.assert(ctx.is("json"), 406);

  const id = await data.addExample(ctx.request.body);

  ctx.body = {
    "id": id,
  };
});

/**
 * Delete an example by id
 */
router.delete('/examples/:id', async (ctx) => {
  await data.deleteExample(ctx.params.id);

  ctx.body = {};
});

module.exports = app;


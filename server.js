const Koa = require("koa");
const BodyParser = require("koa-bodyparser");
const Router = require("koa-router");
const Logger = require("koa-logger");
const serve = require("koa-static");
const mount = require("koa-mount");
const cors = require('koa-cors');
const HttpStatus = require("http-status");

const app = new Koa();

//These are the new change
const static_pages = new Koa();
static_pages.use(serve(__dirname + "/client/build")); //serve the build directory
app.use(mount("/", static_pages));

const PORT = process.env.PORT || 3011;

app.use(BodyParser());
app.use(Logger());
app.use(cors());

const router = new Router();

// POST ENDPOINT FOR EVEN NUMBER
router.post("/numList/even",async (ctx,next)=>{
  const numList = [];
  
  console.log(1001,ctx.request.body);
  let requestBody = ctx.request.body.test;
  for(let count =1; count<=parseInt(requestBody);count++){
    count%2==0? numList.push(count): null;
    console.log(numList)
  }
  // shuffle the array
  numList.sort(() => Math.random() - 0.5);
  ctx.status = HttpStatus.OK;
  ctx.body = numList;
  await next();
});

// POST ENDPOINT FOR ODD NUMBER
router.post("/numList/odd",async (ctx,next)=>{
  const numList = [];
  
  console.log(1001,ctx.request.body);
  let requestBody = ctx.request.body.test;
  for(let count =1; count<=parseInt(requestBody);count++){
    count%2==0? null : numList.push(count);
    console.log(numList)
  }
  // shuffle the array
  numList.sort(() => Math.random() - 0.5);
  ctx.status = HttpStatus.OK;
  ctx.body = numList;
  await next();
});

app.use(router.routes()).use(router.allowedMethods());


app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/", PORT, PORT);
});
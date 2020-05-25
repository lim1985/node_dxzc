const Koa = require("koa");

const path = require("path");
const app = new Koa();
const router = require("./router/index");
const cors = require("koa-cors");
const bodyparser = require("koa-bodyparser");
const koaBody = require("koa-body");
const static = require("koa-static");
app.use(cors());

// parse application/x-www-form-urlencoded
// app.use(bodyparser.urlencoded({ extended: false }));

// // parse application/json
// app.use(bodyparser.json());
app.use(static(path.join(__dirname, "./uploadfiles/")));
// app.use(staticResource(__dirname + './static/'));
// app.use(staticResource(__dirname + './uploadfiles/'));
app.use(
  koaBody({
    multipart: true,
    formLimit: "10mb",
    jsonLimit: "10mb",
    formidable: {
      // uploadDir: path.join(__dirname, `/uploadfiles/`),
      maxFileSize: 3000 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
    }
  })
);

app.use(bodyparser({ multipart: true, formLimit: "10mb", jsonLimit: "10mb" }));

//    .use(bodyparser({jsonLimit: '10mb'}))
//    .use(bodyparser({formLimit: '10mb'}))
//    .use(bodyparser({textLimit: '10mb'}))

// // parse application/json
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({ extended: false }));

// app.use(koaBody({
//     // multipart: true,
//     formLimit:'4mb'
//     // formidable: {
//     //             maxFileSize: 3000*1024*1024    // 设置上传文件大小最大限制，默认2M
//     //         }
//         }))
// app.use(bodyparser({limit: '50mb'}));
// app.use(bodyparser.urlencoded({limit: '50mb'}));
// app.use(koaBody({
//     formLimit:'20mb',
//     jsonLimit :'20mb',
//     textLimit:'20mb',
//     text:true,
//     json:true,
//     multipart: true,
//     formidable: {
//         maxFileSize: 3000*1024*1024    // 设置上传文件大小最大限制，默认2M
//     }
// }));
// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(router.routes());

app.listen(3002, () => {
  console.log("启动了3002端口!");
});

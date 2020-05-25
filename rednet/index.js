const http = require("http");
const querystring = require("querystring");
const db = require("../config/db");
const gov = db.gov;
const ArticleModel = gov.import("../schema/PE_U_Article.js");
class redNet {
  // static getCode(ctx)
  // {
  //     let myquery=ctx.query.code;
  //     return myquery
  // }
  static send(ctx) {
    return new Promise((resolve, reject) => {
      //    var mycode=kechuang_sso.getCode(ctx);
      //    console.log(mycode)
      let params = ctx.request.body;

      var content = JSON.stringify(params);
      console.log(typeof content);
      console.log(content);
      // let title=ctx.request.body.title
      // console.log(typeof(params));
      // var content=JSON.stringify(params);
      // console.log(content);
      // var content=JSON.stringify(params);
      // var Content=JSON.stringify(params);
      //     console.log(typeof(Content));
      //     console.log(Content)
      //  var Content2=querystring.stringify(params);
      // console.log('=================================')
      // console.log(typeof(Content2));
      // console.log(Content2);

      //    console.log(Content);
      //    var json=JSON.stringify(params)
      //    console.log(params);
      //    console.log(content);
      //    console.log(json);
      //var content=querystring.stringify(data);
      //    var content=querystring.stringify(params);
      //    console.log(typeof(content));
      //    var json=JSON.parse(content)
      //    console.log(params);
      //  resolve(params);
      //172.16.6.1/api/content-ms/daxiang-content
      var options = {
        hostname: "172.16.6.1",
        method: "POST",
        path: "/api/content-ms/daxiang-content",
        headers: {
          // 'X-API-KEY':'MfgXpPQOSVWeZjJJvaAl2w',
          accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8"
        }
      };
      //   console.log(options)
      var req = http.request(options, function(res) {
        res.setEncoding("utf-8");
        res.on("data", result => {
          console.log(result);
          // console.log(statusStr(result));
          resolve(result);
        });
        res.on("end", function() {});
      });
      req.on("error", function(err) {
        console.error(err);
        reject(err);
      });
      req.write(content);
      req.end();

      // console.log(ctx.query.code)
      //    let datatype=params.datatype;
      //    let datalist={}
      //    switch(n)
      //     {
      //     case 1:
      //     执行代码块 1
      //     break;
      //     case 2:
      //     执行代码块 2
      //     break;
      //     default:
      //     n 与 case 1 和 case 2 不同时执行的代码
      //     }
      //    var data ={
      //        code:mycode,
      //        fields:[
      //            'name',
      //            'certificateNum',
      //            'phone',
      //            'sex',
      //            'email',
      //            'addr',
      //            'loginType'
      //        ]
      //     //    name:'name',
      //     //    ccard:'certificateNum'

      //    }
      //    var content=querystring.stringify(data);
      //    //code=Z_L-lSwpRXSjlBBnh-Fjxg&fields=name',
    });
    // http://xndt.egp.c2cloud.cn/hnvirtualhall/register/jsp/querycodedo.jsp
    // var url='http://xndt.egp.c2cloud.cn/hnvirtualhall/register/jsp/querycodedo.jsp'
    // console.log(url)
    // var req=http.request(url,function(res){

    //     console.log(res)
    // })
    // req.on('error',function(err){
    //     console.log('出错了')
    //   //  console.error(err);
    // });
    // req.end();
  }
  static async getresult(ctx, next) {
    //apikey=6FwrMN5icSHSxqYicUaib6XtA
    // return new Promise((resolve,reject)=>{
    //    ctx.header.set('X-API-KEY','6FwrMN5icSHSxqYicUaib6XtA')
    //    ctx.header.set('accept','application/json')
    //    ctx.header.set('Content-Type','application/json;charset=UTF-8')
    //    ctx.body={
    //        code:0
    //    }

    var c = await redNet.send(ctx);
    ctx.body = {
      c
    };
  }
  static async IsSend(s, next) {
    ArticleModel.update(
      { IsNotSend: true },
      {
        where: {
          ID: s
        }
      }
    )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
module.exports = redNet;

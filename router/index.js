const Router = require("koa-router");
const SmsRouter = require("../sendsms/sendsmsAction");
const receiveMo = require("../sendsms/receiveMo");
const KechuangSSO = require("../KeChuang_SSO/sso");
const Historys = require("../controller/History_controller");
const Rednet = require("../rednet/index");
const ReadFiles = require("../controller/Readfiles_controller");
const Article = require("../controller/Rednet_controller"); //获取文章根据ID
const Approvaform = require("../controller/Approval_controller");
const TT = require("../controller/TT_controller");
const Toshaoyang = require("../controller/Toshaoyang");
const router = new Router({
  prefix: "/dxzc"
});

// router.get('/ss',(next,ctx)=>{
//     ctx.body='hello'
// })
router
  .get("/sendsms", SmsRouter.Send) //发送短信
  .get("/mo", receiveMo.mo) //获取回复短信
  .get("/sendshow", SmsRouter.show)
  //获取省里登陆用户信息
  .get("/GetAllUserInfo", KechuangSSO.getUserinfo)
  //内容修改存入数据库
  .post("/addHistory", Historys.AddHistory)
  .get("/viewHistory", Historys.findbyGeneralID)
  .get("/checkroles", Historys.checkroles)
  .get("/view", Historys.verifytoken)

  //红网推送
  .post("/toRednet", Rednet.getresult)
  .get("/updataArticleISsendStatus", Article.updataArticleISsend)
  .get("/getArticle", Article.GetArticle)
  //邵阳市网推送
  .post("/encrypt", Toshaoyang.encrypt)
  .get("/decode", Toshaoyang.decode)
  .post("/addContents", Toshaoyang.addContent)
  .get("/selectChannel", Toshaoyang.selectByNodeID)
  .get("/updateSendStatus", Toshaoyang.updateSendstatus)
  //读取文件
  .get("/readxslx", ReadFiles.readxslx)
  .post("/upload", ReadFiles.uploadfiles)
  .get("/gomail", ReadFiles.sendMail)
  // .post('/tpost',ReadFiles.Posttest)
  // .get('/tget',ReadFiles.gettest)
  //审批表
  .get("/getApprovaform", Approvaform.GetApprovaformStatus)
  .get("/getTopID", Approvaform.GetTopArticleIdAndCommomModel)
  .post("/createAorC", Approvaform.CreateArticleAndCommomModel)
  .get("/getnodeid", Approvaform.GetNodesInfoByDepID)
  .post("/AddnewsByApp", Approvaform.AddnewsByApp) //手机上传

  //测试的
  .get("/GetTT", TT.tt)
  //测试新建目录
  .post("/uploads", ReadFiles.uploads)

  .post("/singlelupload", ReadFiles.singleUpload)
  .post("/singleImageUpload", ReadFiles.singleImageUpload);

module.exports = router;

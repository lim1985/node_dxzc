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
const UserManager = require("../controller/UserManager_controller");
const initfile = require("../controller/file_controller");
const xzqh = require("../controller/Xzqh_controller");
const router = new Router({
  prefix: "/dxzc"
});

// router.get('/ss',(next,ctx)=>{
//     ctx.body='hello'
// })
router
//行政区划信息获取
  .get("/allxzqh", xzqh.select) //发送短信
// ------------------------------
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
  .get("/updataArticleISsendStatusdAndRednet", Article.updataArticleISsendAndRednet)
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
  .post("/v1/createAorC", Approvaform.V1CreateArticleAndCommomModel)
  .get("/getnodeid", Approvaform.GetNodesInfoByDepID)
  .post("/AddnewsByApp", Approvaform.AddnewsByApp) //手机上传
  .post("/AddfilesBymobile", Approvaform.AddfilesBymobileApp) //手机上传
  .get("/GetArticleList", Approvaform.GetArticleList)
  .get('/GettodayContentList',Approvaform.GettodayContentList)
  .get('/GetArticleByItemID',Approvaform.GetArticleByItemID)
  .get('/getfilesattach',Approvaform.get_files_attachmentsbyID)
  .get('/getconetentbyid',Approvaform.getConetentByID)
  .get('/getcontextlistbyspecialid',Approvaform.getcontextListbyspecialID)
  .get('/getAllspecialID',Approvaform.getAllspecialID)
  


  //测试的
  .get("/GetTT", TT.tt)
  //测试新建目录
  .post("/uploads", ReadFiles.uploads)

  .post("/singlelupload", ReadFiles.singleUpload)
  .post("/singleImageUpload", ReadFiles.singleImageUpload)
  .post("/singlefileUpload", ReadFiles.singlefileUpload)
  //用户管理接口
  .get("/GetUserRoles",  UserManager.GetUserRoles)
  //文件新建
  .post("/createword",  initfile.createWord)
  .get("/downloadfile",  initfile.downloadfile)
 



  
module.exports = router;

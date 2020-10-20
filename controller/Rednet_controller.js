const Rednet = require("../rednet/index");
const ApprovalFormModel = require("../ApprovalForm/index"); //方法来自审批表取数据接口

class RednetController {
  static async updataArticleISsendAndRednet(ctx) {
    // let ID = ctx.query.ID;
    let data=ctx.request.query
    console.log(data)
    let status = await Rednet.updateSendstatusAndRednet(data);

    if (status) {
      console.log("修改失败！");
      ctx.body = {
        code: -1
      };
    } else {
      ctx.body = {
        code: 1
      };
      console.log("修改成功！");
    }
  }

  static async GetArticle(ctx) {
    const Item = ctx.request.query.GeneralID;
    if (!Item) {
      ctx.body = {
        code: -1,
        message: "参数不正确"
      };
      return;
    }

    let s = await ApprovalFormModel.GetArticleByItemID(Item);
    console.log(s);
    if (!s || !s.Content) {
      ctx.body = {
        code: -1
      };
    } else {
      let contents = s.Content;
      let content = RednetController.addDomainWithStr(
        contents,
        "http://info.dxzc.gov.cn"
      );
      let body = new Object();
      body.IsSend = !s.IsNotSend ? false : true;
      body.status = s.Status;
      body.content = content;
      body.Title = s.Title;
      body.Author = s.Author;
      body.Keyword = s.Keyword;
      body.Subheading = s.Subheading;
      body.CopyFrom = s.CopyFrom;
      body.TitleIntact = s.TitleIntact;
      body.siteUrl = s.siteUrl;
      body.NodeID = s.NodeID;
      body.Intro = s.Intro;
      body.GeneralID = s.GeneralID;
      body.InputTime = s.InputTime.valueOf();
      body.realInputTime = s.InputTime;
      body.DefaultPicUrl =
        "http://info.dxzc.gov.cn/uploadfiles/" + s.DefaultPicUrl;
      body.Rednetcategory = s.Rednetcategory;
      body.Inputer = s.Inputer;
      body.IsSendShaoYang = s.IsSendShaoYang;
      body.syContentID = s.syContentID;
      body.RednetID = s.RednetID;
      body.rednetUrl = s.rednetUrl;
      ctx.body = {
        body       
      };
    }
  }
  static addDomainWithStr(str, domain) {
    //{PE.SiteConfig.ApplicationPath/}{PE.SiteConfig.uploaddir/}
    let path = `/UploadFiles/`;
    let html = str
      .replace(
        /src="{(PE.SiteConfig.ApplicationPath\/)}{(PE.SiteConfig.uploaddir\/)}/g,
        'src="' + domain + path
      )
      .replace(/src="(?=\/UploadFiles)/g, 'src="' + domain);

    return html;
  }
  // static addDomainWithStr(str, domain){
  //     return str.replace(/src="(?=\/UploadFiles)/g, "src=\"" + domain);
  // }
}

module.exports = RednetController;

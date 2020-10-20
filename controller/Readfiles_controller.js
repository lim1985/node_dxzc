const readfiles = require("../Readfiles/index");
const ApprovalFormModel = require("../ApprovalForm/index"); //方法来自审批表取数据接口

class readfilesController {

 
  static async singlefileUpload(ctx) {
    let res = await readfiles.singlefileUpload(ctx);
    let result = {
      code: -1,
      msg: "上传失败"
    };
    if (!res.isok) {
      ctx.body = {
        result
      };
    }
    (result.code = 10000), (result.msg = "上传成功");
    result.res = res;
    ctx.body = {
      result
    };
  }
  static async singleImageUpload(ctx) {
    let res = await readfiles.singleImageUpload(ctx);
    
    if (!res.isok) {
      ctx.body = {
         result:{
          code: -1,
          msg: "上传失败"
        }
      };
    }
    else
    {
   
      ctx.body = {
        result:{
          code: 10000,
          msg: "上传成功",
          res:res
        }
      };
    }
   
  }
  static async singleUpload(ctx) {
    let res = await readfiles.newUploads(ctx);
    let result = {
      code: -1,
      msg: "上传失败"
    };
    if (!res.isok) {
      ctx.body = {
        result
      };
    }
    (result.code = 10000), (result.msg = "上传成功");
    ctx.body = {
      result
    };
  }
  static async uploads(ctx) {
    let s = await readfiles.uploads(ctx);
    let result = {
      code: -1,
      msg: "上传失败"
    };
    if (!s.ID) {
      ctx.body = {
        result
      };
    }
    (result.code = 10000), (result.msg = "上传成功");
    ctx.body = {
      result
    };
  }
  static async GetArticle(ctx) {
    let s = await ApprovalFormModel.GetArticleByItemID(61613);
    ctx.body = {
      s
    };
  }
  static async Posttest(ctx) {
    let s = await readfiles.t(ctx);
    ctx.body = {
      s
    };
    console.log(s);
  }
  static async gettest(ctx) {
    let s = await readfiles.A(ctx);
    ctx.body = {
      s
    };
    console.log(s);
  }
  static async sendMail(
    ctx //发邮件，接收函数体
  ) {
    let status = await readfiles.GoMail(ctx);
    // console.log(xslx_stream.Sheets);
    // let stream=xslx_stream.Sheets
    ctx.body = {
      status
    };
  }
  static async readxslx(ctx) {
    let xslx_stream = await readfiles.readxlsx();
    // console.log(xslx_stream.Sheets);
    let stream = xslx_stream.Sheets;

    ctx.body = {
      stream
    };
  }
  static async uploadfiles(ctx) {
    let datas = new Object();
    let file = await readfiles.uploadfiles(ctx);
    // console.log(file.filename);

    datas = await readfiles.readxlsx(file.filename);
    //   console.log(datas)
    let stream = datas;
    ctx.body = {
      stream
    };

    // datas= await readfiles.readxlsx(file.filename)

    // readfiles.uploadfiles(ctx).then(res=>{
    //     // console.log(res)
    //     // console.log(res.filename);
    //     setTimeout(() => {
    //        readfiles.readxlsx(res.filename).then(data=>{
    //             let stream=data.Sheets
    //            console.log(stream);
    //            // datas=stream;

    //         })
    //     }, 1500);
    // })

    //     console.log(filestream);
    //   if(!filestream.isupload)
    //   {
    //         return ctx.body={
    //             message:'文件打开失败！'
    //         }
    //   }
    //   let xslx_stream=await readfiles.readxlsx(ctx.filename);
    //   console.log(xslx_stream)
    //   let xslx_stream=await readfiles.readxlsx(ctx.name);
    //   let stream=xslx_stream.Sheets

    //   let stream=filestream.Sheets
    // ctx.body={
    //     stream
    // }
    //  console.log(filestream);
  }
}

module.exports = readfilesController;

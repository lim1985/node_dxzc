// const Rednet=require('../rednet/index')
// const ApprovalFormModel = require('../ApprovalForm/index')//方法来自审批表取数据接口

const Toshaoyang = require("../shaoyang/index");

class ToshaoyangContorller {
  static async updateSendstatus(ctx) {
    let data = ctx.request.query;
    console.log(data);
    let res = await Toshaoyang.IsSend(data);
    ctx.body = {
      res
    };
  }
  static async selectByNodeID(ctx) {
    let data = ctx.request.query;
    // data.NodeId=25
    let res = await Toshaoyang.selectChennelByNodeID(data);
    ctx.body = {
      res
    };
  }
  static async addContent(ctx) {
    const datas = ctx.request.body;
    console.log(datas.GID);
    let encrypt = await ToshaoyangContorller.encrypt(datas); //加密
    if (!encrypt) {
      ctx.body = {
        code: -1
      };
    } else {
      let sendstatus = await Toshaoyang.add(encrypt.data); //加密后送到市里平台
      let result = await ToshaoyangContorller.decode({ msg: sendstatus }); //解密返回数据
      console.log(`000---000`);
      console.log(result);

      if (result.status) {
        await Toshaoyang.IsSend(datas.GID, result.data.manuscriptId);
        ctx.body = {
          result
        };
      } else {
        ctx.body = {
          code: -1,
          msg: "推送失败。"
        };
      }
      //data:
      // result:
      // data:
      // manuscriptId: "a0d0e017fbae45eb9afb0f2a19489fd9"
      // result: "稿件入库成功"
      // __proto__: Object
      // msg: "接口访问成功！"
      // status: true
    }

    // ctx.body={
    //     datas,
    //     encrypt
    // }
    // let res=await Toshaoyang.add(datas.jsopMap);
  }
  static async encrypt(
    data //加密
  ) {
    let datas = data.params;
    let res = await Toshaoyang.encrypt(datas);
    return res;
    // ctx.body={
    //     res
    // }
  }
  static async decode(data) {
    const datas = data;
    let res = await Toshaoyang.decode(datas.msg.data);
    return res;
  }
}

module.exports = ToshaoyangContorller;

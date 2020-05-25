const Rednet = require("../rednet/index");
const ApprovalFormModel = require("../ApprovalForm/index"); //方法来自审批表取数据接口

class TTContorller {
  static async tt(ctx) {
    const s = ctx.query.ID;
    console.log(s);
    ctx.body = {
      id: s
    };
  }
}

module.exports = TTContorller;

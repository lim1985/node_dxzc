
const XzqhModel = require("../xzqh/index"); //方法来行政区划

class XzqhContorller {
  static async tt(ctx) {
    const s = ctx.query.ID;
    console.log(s);
    ctx.body = {
      id: s
    };
  }
  static async select(ctx)
  {
    let result=await XzqhModel.selectAll();
    ctx.body={
      result
    }
  }
}

module.exports = XzqhContorller;

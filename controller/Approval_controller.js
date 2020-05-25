const ApprovalFormModel = require("../ApprovalForm/index");

class ApprovalFormController {
  static async AddnewsByApp(ctx) {
    let data = ctx.request.body;
    console.log(data);
    let result = await ApprovalFormModel.AddnewsByApp(data);
    console.log(result);
    if (result.fileinfo && result.result.ID > 0) {
      ctx.body = {
        code: 10000,
        msg: "提交成功"
      };
    }
  }
  static async GetNodesInfoByDepID(ctx) {
    let data = ctx.request.query;
    console.log(data);
    let result = await ApprovalFormModel.GetNodesInfoByDepID(data.DepID);
    if (!result) {
      ctx.body = {
        code: -1,
        msg: "未找到该部门下的节点"
      };
      return;
    }

    ctx.body = {
      result
    };
  }
  static async GetTopArticleIdAndCommomModel(ctx) {
    let result = await ApprovalFormModel.GetTopArticleIdAndCommomModel();
    ctx.body = {
      result
    };
  }
  static async CreateArticleAndCommomModel(ctx) {
    let data = ctx.request.body;
    console.log(data);
    if (JSON.stringify(data) == "{}") {
      ctx.body = {
        code: -1
      };
    } else {
      let res = await ApprovalFormModel.CreateArticleAndCommomModel(data);
      ctx.body = {
        res
      };
    }
  }
  static async GetApprovaformStatus(ctx) {
    const Item = ctx.request.query.itemid;
    console.log(Item);
    let result = await ApprovalFormModel.GetApprovalFormByItemID(Item);
    console.log(result);

    if (
      result.IsApprovalForm == false ||
      result.IsApprovalForm == null ||
      result.ApprovalForm == null
    ) {
      ctx.body = {
        status: -1
      };
    } else {
      ctx.body = {
        status: 1,
        res: result
      };
    }
  }
}

module.exports = ApprovalFormController;

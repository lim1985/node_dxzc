const HistoryModel = require("../models/History");
// const jwt = require('jsonwebtoken')
// const secret = require('../config/secret.json')
// const bcrypt = require('bcryptjs')

class HistoryController {
  /*
*添加历史修改记录，post传入ctx 对象

*/
  static async verifytoken(ctx) {
    let params = ctx.request.query;

    console.log(`------${params.id}--------------------`);
    console.log(`------${params.token}--------------------`);
    let verify = await HistoryModel.verify(params.token);
    if (!verify) {
      ctx.body = "认证身份无效，请重新登陆！";
      return false;
    } else if (verify.lat >= verify.exp) {
      ctx.body = "请求超时，请重新登陆认证！";
      return false;
    } else if (!verify) {
      ctx.body = "认证身份无效，请重新登陆！";
      return false;
    } else {
      let a = await HistoryModel.Gethistory(params.id);
      ctx.body = {
        result: a
      };
    }
  }

  static async checkroles(ctx) {
    let params = ctx.request.query;
    let roles = await HistoryModel.CheckRoles(params.AdminName);

    if (roles.code == 1) {
      ctx.body = {
        token: roles
      };
    } else {
      ctx.body = {
        code: roles.code
      };
    }
  }
  static async AddHistory(ctx) {
    let params = ctx.request.body;
    console.log(params);
    let res = await HistoryModel.AddHistory(params);
    console.log(res);
    if (!res) {
      ctx.body = {
        code: -1,
        message: "写入记录失败。"
      };
    } else {
      ctx.body = {
        code: 1,
        message: "写入成功。"
      };
    }
  }

  /**删除权限
   *@param{ctx}
   */
  static async DeletePermissionByID(ctx) {
    // const data=ctx.request.query
    console.log(ctx.request.query);
    const data = ctx.request.query;
    const flag = await PermissionModel.delPermission(data.ID);
    console.log("控制器：");
    console.log(flag);
    if (flag == 1) {
      ctx.body = {
        code: 1,
        message: "删除权限成功"
      };
    } else {
      ctx.body = {
        code: -1,
        message: "删除权限失败"
      };
    }
  }

  /**
   * 查询所有历史纪录byGeneralID
   * @param {*} ctx
   */
  static async findbyGeneralID(ctx) {
    // const flag=await PermissionModel.dbasync()
    // console.log(flag)
    //  console.log(ctx.request.query)
    const ID = ctx.request.query.generalId;
    console.log(ID);
    const list = await HistoryModel.findAllByGeneralID(ID);
    console.log(list.rows);
    const result = list.rows;
    ctx.body = {
      result: result
    };
  }

  /**
   * 增加角色
   * @param ctx
   * @returns {true}
   */
  static async createPermission(ctx) {
    const flag = await PermissionModel.dbasync();
    console.log(flag);
    const data = ctx.request.query;
    console.log(data);
    const roleinfo = await PermissionModel.findIDByPermissionName(data);
    //    const flag = RolesModel.dbasync();
    if (flag) {
      if (roleinfo) {
        ctx.body = {
          code: -1,
          message: "该角色名或标识已经存在"
        };
        console.log("角色已经存在");
      } else {
        const addRolesStatus = await RolesModel.createRoles(data);
        console.log("可以创建角色");
        if (addRolesStatus) {
          ctx.body = {
            code: 1,
            message: "角色建立成功"
          };
        } else {
          ctx.body = {
            code: -1,
            message: "角色建立失败"
          };
        }
      }
    } else {
      console.log("表还没有创建！");
    }
  }
  /**
   * 修改权限
   * @param {*} ctx
   */
  static async UpdatePermission(ctx) {
    //console.log(ctx.request.query)
    const data = ctx.request.query;
    const Permissioninfo = await PermissionModel.findIDByPermissionName(
      data.Permission_key
    );

    if (Permissioninfo) {
      ctx.body = {
        code: -1,
        message: "该权限标识已存在，请不要重复添加"
      };
    } else {
      const result = await PermissionModel.updatePermission(data);
      if (result) {
        ctx.body = {
          code: 1,
          message: "修改成功！"
        };
      } else {
        ctx.body = {
          code: -1,
          message: "修改失败！"
        };
      }
    }
  }
  /**
   * 新增权限
   * @param ctx
   * @return {ctx.body={ctx.body=code:1}}
   */
  static async AddPermission(ctx) {
    //  console.log(ctx.request.query)
    const flag = await PermissionModel.dbasync();
    const data = ctx.request.query;
    //     console.log('11')
    // console.log(data)
    const result = await PermissionModel.findIDByPermissionName(
      data.Permissionskey
    );
    console.log(result);
    if (flag) {
      if (result) {
        ctx.body = {
          code: -1,
          message: "该权限标识已存在，请不要重复添加"
        };
      } else {
        const addPermissionstatus = await PermissionModel.createPermission(
          data
        );
        if (addPermissionstatus) {
          ctx.body = {
            code: 1,
            message: "权限添加成功！"
          };
        } else {
          ctx.body = {
            code: -1,
            message: "权限添加失败"
          };
        }
      }
    } else {
      ctx.body = {
        code: -1,
        message: "表还没有创建，请创建表"
      };
    }
  }
}

module.exports = HistoryController;

const UserManagerModel = require("../Users/index");

class UserManagerController {
  static async GetUserRoles(ctx)
  {
    let data = ctx.request.query;
    if (JSON.stringify(data) == "{}") {
      ctx.body = {
        code: -1,
        msg: "参数错误"
      };
    } else if (!data.tel || data.tel=='') {
      ctx.body = {
        code: -1,
        msg: "参数错误"
      };
    }
    else
    {
      let result=await UserManagerModel.GetAdminRoles(data)
      
      if(!result)
      {
        ctx.body={
          code:-1
        }
      }
      else
      {
      var _roles= result.roles.map(v=> v.RoleID)
      let body={
        AdminID:result.AdminID,
        AdminName:result.AdminName,
        UserName:result.UserName,
        Contacter:result.Contacter,
        roles:_roles
      }
  
      ctx.body={   
        code:100,   
        body
      }
    }
    }
  }
}

module.exports = UserManagerController;

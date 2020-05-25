const db = require("../config/db");
const gov = db.gov;
const history = gov.import("../schema/history.js");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

// const jwtKoa = require('koa-jwt')

class HistoryModel {
  /**
   * 查询用户信息
   * @param name  姓名
   * @returns {Promise.<*>}
   */
  //   static async findUserByName (AdminName) {
  //     const userInfo = await Admin.findOne({
  //       where: {
  //         AdminName
  //       }
  //     })
  //     return userInfo
  //   }
  /**
   * 添加角色
   *
   */
  // static async dbasync()
  // {

  //   const flag= Permission.sync({force: false})

  //  if (flag)
  //  {return true}
  //  else
  //  {return false}
  // //  await Roles.sync({force: false})
  // //  return true
  // //   Roles.sync({force: false}).then(res=>{
  // //    return true
  // //  })
  // }

  static async Gethistory(id) {
    let getsql = `SELECT   ID, GeneralID, Action, NodeID, InputTime, contents, status, title, nums, fulltitle, fubiaoti, KeyWords, auther, froms, 
      Defaultimg, ModelID, AdminUser, introduce, Md5 FROM LIM_History WHERE   (GeneralID = N'${id}') order by InputTime desc`;
    let res = await gov.query(getsql, { type: gov.QueryTypes.SELECT });
    return res;
  }

  static async verify(token) {
    let obj = new Object();
    jwt.verify(token, "52979899a", function(err, decoded) {
      console.log(decoded); // bar
      obj = decoded;
    });
    return obj;
  }

  /**
   *
   * @param {ctx} param
   */
  static async CheckRoles(AdminName) {
    let secret = "52979899a";
    let res = await gov.query(
      `SELECT PE_Admin_Roles.RoleID, PE_Admin.AdminID, PE_Admin.AdminName FROM  
                 PE_Admin INNER JOIN PE_Admin_Roles ON PE_Admin.AdminID = PE_Admin_Roles.AdminID WHERE 
                (PE_Admin.AdminName = N'${AdminName}') AND (PE_Admin_Roles.RoleID in ( 130,131,134))`,
      { type: gov.QueryTypes.SELECT }
    );
    console.log(res);

    let Token = new Object();
    let result = new Array();
    if (!res[0]) {
      //没有查到任何记录，说明没有权限，返回code：-1
      return { code: -1 };
    } else {
      for (let i = 0; i <= res.length - 1; i++) {
        result.push(res[i].RoleID);
      }
    }
    Token = {
      ID: res[0].AdminID,
      AdminName: res[0].AdminName,
      RoleID: result
    };
    const token = jwt.sign(Token, secret, { expiresIn: "2h" }); //token签名 有效期为1小时
    return {
      code: 1,
      RoleID: result,
      token: token
    };
  }
  /**
   * 新添加权限
   * @param userdata
   * @returns {Promise.<boolean>}
   */
  static async AddHistory(data) {
    console.log(data);
    const hash = crypto.createHash("md5");
    let md5 = "";
    hash
      .update(data.title)
      // .update(data.fulltitle)
      .update(data.auther_1)
      .update(data.fubiaoti)
      .update(data.KeyWords)
      .update(data.auther)
      .update(data.froms)
      .update(data.introduce)
      .update(data.contents)
      .update(data.status);

    let mymd5 = hash.digest("hex");
    let GeneralID = 0;
    await gov
      .query(
        "select top 1 GeneralID  from [dbo].[PE_CommonModel] order by GeneralID desc",
        { type: gov.QueryTypes.SELECT }
      )
      .then(function(ID) {
        GeneralID = ID;
        //返回最大GeneralID
      });
    if (data.Action == "modify" || data.Action == "Modify") {
      //如果是修改的状态
      let OldMd5 = await gov.query(
        "select top 1 Md5 from [dbo].[LIM_History] where GeneralID=" +
          data.GeneralID +
          "order by ID desc"
      );
      console.log(`要写入的：` + mymd5);
      if (OldMd5[0][0] == "" || OldMd5[0][0] == undefined) {
        md5 = mymd5;
      } else if (mymd5 == OldMd5[0][0].Md5) {
        return false;
      } else {
        md5 = mymd5;
      }
      //  let md5old= OldMd5[0][0].Md5
    }
    let obj = new Object();
    obj = GeneralID[0];

    if (data.Action == "add") {
      //如果是新增的状态
      data.GeneralID = obj.GeneralID + 1;
      md5 = mymd5;
    }
    console.log(md5);
    await history.create({
      Md5: md5,
      GeneralID: data.GeneralID,
      Action: data.Action,
      NodeID: data.NodeID,
      InputTime: data.InputTime,
      contents: data.contents,
      status: data.status,
      title: data.title,
      nums: data.nums,
      fulltitle: data.fulltitle,
      fubiaoti: data.fubiaoti,
      KeyWords: data.KeyWords,
      auther: data.auther,
      froms: data.froms,
      introduce: data.introduce,
      Defaultimg: data.Defaultimg,
      ModelID: data.ModelID,
      AdminUser: data.AdminUser
    });
    return true;
  }

  /**
   * 修改角色
   * @param role
   * @returns {Promise.<boolean>}
   */
  //   static async updatePermission(data)
  //   {
  //     return  new Promise((resove,reject)=>{
  //         try {
  //             Permission.update(data,{where:{ID:data.ID}}).then(res=>
  //             {
  //               console.log(res)
  //               resove(res)
  //             }).catch(function(reject)
  //             {
  //               console.log(reject)
  //               return reject()
  //             })
  //         } catch (error) {
  //           reject(error)
  //         }
  //       })
  //   }
  //   static async updatePermission (data) {
  //     await Permission.update(data,{
  //       'Permission_name': data.Permissionvalue,
  //       'Permission_key': data.Permissionskey,
  //       'description': data.description
  //     },
  //      where:{ID:data.ID}  )
  //     return true
  //   }
  /**
   * 删除角色
   * @param role
   * @returns {Promise.<boolean>}
   */
  //   static async delPermission (data) {
  //     return  new Promise((resove,reject)=>{
  //       try {
  //         Permission.destroy({where:{ID:data}}).then(res=>
  //           {
  //             console.log(res)
  //             resove(res)
  //           }).catch(function(reject)
  //           {
  //             console.log(reject)
  //             return reject()
  //           })
  //       } catch (error) {
  //         reject(error)
  //       }
  //     })

  //   }
  /**
   * 查询所有角色
   * @param user
   * @returns {Promise.<boolean>}
   */
  //   static async findPermiss(ctx) {
  //   const Permissionlist=  await Permission.findAndCountAll(
  //     ctx,
  //     //{ offset: 0, limit: 10 },
  //      {
  //       order:Permission.addtime
  //      }
  //     )
  //     return Permissionlist
  //   }
}

module.exports = HistoryModel;

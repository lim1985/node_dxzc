const db = require("../config/db");
const gov = db.gov;
const Article = gov.import("../schema/PE_U_Article");
const CommModel = gov.import("../schema/PE_CommonModel");
const Nodes = gov.import("../schema/PE_Nodes");
const Files_attach = gov.import("../schema/LIM_files_ attachments");
const Sequelize = require("sequelize");
const moment = require("moment");
// const jwtKoa = require('koa-jwt')
CommModel.belongsTo(Article, {
  foreignKey: "GeneralID",
  targetKey: "ID",
  as: "A"
});
class ApprovalFormModel {
  /**
   * 记录文件附件存放地址
   */
  static async AddnewsByApp(data) {
    return new Promise(async resolve => {
      console.log(data);
      let CommomModel = {
        Hits: 0,
        DayHits: 0,
        WeekHits: 0,
        MonthHits: 0,
        ShowCommentLink: 0,
        TitleHashKey: 4404120156978810509,
        NodeID: data.NodeID,
        GeneralID: data.GeneralID,
        ModelID: 1,
        ItemID: data.GeneralID,
        TableName: "PE_U_Article",
        Title: data.title,
        Inputer: data.UserName,
        LinkType: 0,
        UpdateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
        CreateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
        Status: 1,
        InputTime: moment().format("YYYY-MM-DD HH:mm:ss"),
        SGType: 0,
        SGDataId: 0,
        EliteLevel: 0,
        Priority: 0,
        CommentAudited: 0,
        CommentUnAudited: 0,
        SigninType: 0,
        ClientType: 1,
        DefaultPicUrl: data.defaultPic
      };
      let Article = {
        Content: data.content,
        ID: data.GeneralID,
        Intro: data.intors,
        Keyword: 0,
        OpenType: 0,
        siteUrl: ""
      };
      //       console.log(`-1-1--1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-`)

      let result = await ApprovalFormModel.CreateArticleAndCommomModel({
        A: Article,
        C: CommomModel
      });
      let fileinfo = await ApprovalFormModel.addFiles(data.imges);

      console.log(result);
      resolve({ fileinfo, result });
    });
  }
  static async FilesIDIsExtes(ID) {
    return new Promise(async (resolve, reject) => {
      let res = await Files_attach.findOne({
        where: (GeneralID = ID)
      });
      resolve(res);
    });
  }
  static async addFiles(file) {
    return new Promise(async (resolve, reject) => {
      if (!file) {
        reject(false);
      }

      if (file instanceof Array) {
        let _res = await Files_attach.bulkCreate(file);
        resolve({ _res, isok: true });
        return;
      }
      let res = await Files_attach.create(file);
      if (res.id) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  }
  /**
   * 查询用户信息
   * @param itemid
   * @returns {Promise.<*>}
   */
  static async GetNodesInfoByDepID(DepID) {
    const NodeInfo = await Nodes.findOne({
      where: {
        Meta_Keywords: DepID
      },
      raw: true
    });
    return NodeInfo;
  }
  static async GetApprovalFormByItemID(ItemID) {
    const ArticleApprovalForm = await CommModel.findOne({
      attributes: [
        Sequelize.col("A.IsApprovalForm"),
        Sequelize.col("A.ApprovalForm"),
        "GeneralID"
      ],
      where: {
        GeneralID: ItemID
      },
      include: [
        {
          model: Article,
          as: "A",
          attributes: []
        }
      ],
      raw: true
      // include: [
      //     {
      //     attributes: ['PE_U_Article.ApprovalForm','PE_U_Article.IsApprovalForm'],
      //     association: CommModel.belongsTo(Article, {foreignKey: 'GeneralID'}),
      //     },
      // ]
    });
    return ArticleApprovalForm;
  }

  static CreateArticleAndCommomModel(data) {
    let obj = new Object();
    const now = Date.now();
    let InputTime = moment().format("YYYY-MM-DD HH:mm:ss"); //2009-11-14 23:41:09.000
    data.C.InputTime = InputTime;

    let sql = `INSERT INTO [PE_CommonModel] ([GeneralID],[NodeID],[ModelID],[ItemID],[TableName],[Title],[Inputer],[Hits],[DayHits],[WeekHits],[MonthHits],[LinkType],[UpdateTime],[CreateTime],[Status],[EliteLevel],[Priority],[CommentAudited],[CommentUnAudited],[SigninType],[InputTime],[ShowCommentLink],[TitleHashKey],[SGType],[SGDataId],[ClientType],[DefaultPicUrl]) OUTPUT INSERTED.* VALUES
     (${data.C.GeneralID},${data.C.NodeID},1,${data.C.ItemID},N'PE_U_Article',N'${data.C.Title}',N'${data.C.Inputer}',0,0,0,0,0,N'${data.C.InputTime}',N'${data.C.InputTime} ',1,0,0,0,0,0,N'${data.C.InputTime}',0,4404120156978810400,0,0,${data.C.ClientType},N'${data.C.DefaultPicUrl}');`;

    return new Promise(async (resolve, reject) => {
      const a = await Article.create(data.A);

      // const b=await CommModel.create(data.C)
      let b = await gov.query(sql);
      console.log(a);
      obj = Object.assign(a, b, InputTime, { isok: true });
      resolve(obj);
    });
    //  await Article.create(data.A)
    //  await CommModel.create(data.C)
  }
  static async GetTopArticleIdAndCommomModel() {
    const ArticleID = await Article.findOne({
      attributes: ["ID"],
      order: [["ID", "DESC"]]
    });
    return ArticleID;
  }
  static async GetArticleByItemID(ItemID) {
    const Articlelist = await CommModel.findOne({
      attributes: [
        Sequelize.col("A.Content"), //内容
        Sequelize.col("A.Subheading"), //短标题
        Sequelize.col("A.Author"), //作者
        Sequelize.col("A.Keyword"), //关键字
        Sequelize.col("A.CopyFrom"), //来源
        Sequelize.col("A.TitleIntact"), //完整标题
        Sequelize.col("A.Intro"), //简介
        Sequelize.col("A.IsApprovalForm"),
        Sequelize.col("A.ApprovalForm"),
        Sequelize.col("A.IsNotSend"),
        Sequelize.col("A.Rednetcategory"),
        Sequelize.col("A.siteUrl"),
        Sequelize.col("A.syContentID"),
        Sequelize.col("A.IsSendShaoYang"),
        "GeneralID",
        "NodeID",
        "InputTime",
        "Title",
        "DefaultPicUrl",
        "Status",
        "Inputer"
      ],
      where: {
        GeneralID: ItemID,
        TableName: "PE_U_Article",
        Status: 99
      },
      include: [
        {
          model: Article,
          as: "A",
          attributes: []
        }
      ],
      raw: true
      // include: [
      //     {
      //     attributes: ['PE_U_Article.ApprovalForm','PE_U_Article.IsApprovalForm'],
      //     association: CommModel.belongsTo(Article, {foreignKey: 'GeneralID'}),
      //     },
      // ]
    });
    return Articlelist;
  }
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
      Defaultimg, ModelID, AdminUser, introduce, Md5 FROM LIM_History WHERE   (GeneralID = N'${id}') order by InputTime asc`;
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
                (PE_Admin.AdminName = N'${AdminName}') AND (PE_Admin_Roles.RoleID = 130)`,
      { type: gov.QueryTypes.SELECT }
    );

    if (!res[0]) {
      return { code: -1 };
    } else {
      let Token = {
        ID: res[0].AdminID,
        AdminName: res[0].AdminName
      };
      const token = jwt.sign(Token, secret, { expiresIn: "2h" }); //token签名 有效期为1小时
      return {
        code: 1,
        token: token
      };
    }
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

module.exports = ApprovalFormModel;

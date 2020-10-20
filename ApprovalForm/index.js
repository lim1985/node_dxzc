const db = require("../config/db");
const gov = db.gov;
const Article = gov.import("../schema/PE_U_Article");
const CommModel = gov.import("../schema/PE_CommonModel");
const Nodes = gov.import("../schema/PE_Nodes");
const Files_attach = gov.import("../schema/LIM_files_ attachments");
const Sequelize = require("sequelize");
const moment = require("moment");
const { resolve } = require("path");
const Op = Sequelize.Op
          // 在 [1, 2] 之中
// const jwtKoa = require('koa-jwt')
CommModel.belongsTo(Article, {
  foreignKey: "GeneralID",
  targetKey: "ID",
  as: "A"
});
CommModel.belongsTo(Nodes, {
  foreignKey: "NodeID",
  targetKey: "NodeID",
  as: "Node"
});
CommModel.hasMany(Files_attach, {
  foreignKey: "GeneralID",
  targetKey: "GeneralID",
  as: "Files"
});
class ApprovalFormModel {


  static async get_files_attachmentsbyID(id)
  {
    return new Promise(resolve=>{
      let result=Files_attach.findAndCountAll({
        attributes: [
          "path",
          "name",        
        ],
        where:{
          GeneralID:id
        }
      })
      resolve(result);
    })
  }
  static async getConetentByID(generalID)
  {
            let sql=`SELECT  PE_CommonModel.GeneralID, PE_CommonModel.NodeID, PE_CommonModel.ModelID, PE_CommonModel.ItemID, 
            PE_U_Article.[Content], PE_Specials.SpecialName, PE_SpecialInfos.SpecialID, PE_CommonModel.Title, PE_CommonModel.Inputer, 
            PE_CommonModel.Hits, PE_CommonModel.Status, PE_CommonModel.InputTime, PE_CommonModel.DefaultPicUrl, PE_U_Article.TitleIntact, 
            PE_U_Article.Author, PE_U_Article.Keyword, PE_Nodes.Tips, PE_Nodes.NodeName, 
            PE_Nodes.Description
        FROM     PE_Specials INNER JOIN
            PE_SpecialInfos ON PE_Specials.SpecialID = PE_SpecialInfos.SpecialID INNER JOIN
            PE_CommonModel INNER JOIN
            PE_U_Article ON PE_CommonModel.GeneralID = PE_U_Article.ID ON PE_SpecialInfos.GeneralID = PE_CommonModel.GeneralID INNER JOIN
            PE_Nodes ON PE_CommonModel.NodeID = PE_Nodes.NodeID
        WHERE   (PE_CommonModel.GeneralID = ${generalID}) AND (PE_CommonModel.Status = 99)`
                return new Promise(async resolve=>{
                    let result=await gov.query(sql);
                    resolve(result[0])
                })
  }
  static async getAllspecialID(specilCategoryID)
  {
    let sql='SELECT PE_SpecialCategory.SpecialCategoryID, PE_SpecialCategory.SpecialCategoryName, PE_SpecialCategory.SpecialCategoryDir, '+
    'PE_SpecialCategory.SpecialTemplatePath, PE_SpecialCategory.OrderID, PE_SpecialCategory.OpenType, PE_SpecialCategory.IsCreateHtml, '+
    'PE_SpecialCategory.PagePostfix, PE_SpecialCategory.SearchTemplatePath, PE_SpecialCategory.NeedCreateHtml, PE_Specials.SpecialName, '+
    'PE_Specials.SpecialID, PE_Specials.Description FROM     PE_SpecialCategory INNER JOIN PE_Specials ON PE_SpecialCategory.SpecialCategoryID = PE_Specials.SpecialCategoryID'+
    ' WHERE (PE_SpecialCategory.SpecialCategoryID = '+specilCategoryID+')'
    return new Promise(async resolve=>{
      let result=await gov.query(sql);
      resolve(result[0])
    })
  }
  static async getcontextListbyspecialID(SpecilIDs)
  {
    let sql=`SELECT  PE_CommonModel.GeneralID, PE_CommonModel.NodeID, PE_CommonModel.ModelID, PE_CommonModel.ItemID, PE_U_Article.[Content], 
    PE_Specials.SpecialName, PE_SpecialInfos.SpecialID, PE_CommonModel.Title, PE_CommonModel.Inputer, PE_CommonModel.Hits, 
    PE_CommonModel.Status, PE_CommonModel.InputTime, PE_CommonModel.DefaultPicUrl, PE_U_Article.TitleIntact, PE_U_Article.Author, 
    PE_U_Article.Keyword, PE_Nodes.Tips, PE_Nodes.NodeName, PE_Specials.Description
FROM     PE_Specials INNER JOIN
    PE_SpecialInfos ON PE_Specials.SpecialID = PE_SpecialInfos.SpecialID INNER JOIN
    PE_CommonModel INNER JOIN
    PE_U_Article ON PE_CommonModel.GeneralID = PE_U_Article.ID ON PE_SpecialInfos.GeneralID = PE_CommonModel.GeneralID INNER JOIN
    PE_Nodes ON PE_CommonModel.NodeID = PE_Nodes.NodeID
WHERE   (PE_CommonModel.Status = 99) AND (PE_SpecialInfos.SpecialID =${SpecilIDs})
ORDER BY PE_CommonModel.GeneralID DESC`
return new Promise(async resolve=>{
  let result=await gov.query(sql);
  resolve(result[0])
})
  }
  //获取当天已经终审的稿件
  static async GettodayContentList(status)
  {
    //http://info.dxzc.gov.cn/Category_584/Index.aspx?itemID=70302
    let sql99=`SELECT  PE_CommonModel.Title  AS titles, 'http://info.dxzc.gov.cn/Category_584/Index.aspx?itemID=' + CONVERT(varchar(10), PE_CommonModel.GeneralID)  AS link, 
    PE_U_Article.TitleIntact, PE_U_Article.ID
FROM     PE_CommonModel INNER JOIN
    PE_U_Article ON PE_CommonModel.GeneralID = PE_U_Article.ID
WHERE   (DATEDIFF(dd, PE_CommonModel.PassedTime, GETDATE()) = 0) AND (PE_CommonModel.Status = ${status}) AND (PE_CommonModel.NodeID NOT IN (225, 1135)) 
    AND (PE_CommonModel.ModelID = 1) AND (PE_CommonModel.LinkType = 0)`
    let sql2=`SELECT  PE_CommonModel.Title  AS titles, 'http://info.dxzc.gov.cn/Category_584/Index.aspx?itemID=' + CONVERT(varchar(10), PE_CommonModel.GeneralID)  AS link,
    PE_U_Article.TitleIntact, PE_U_Article.ID
FROM     PE_CommonModel INNER JOIN
    PE_U_Article ON PE_CommonModel.GeneralID = PE_U_Article.ID
WHERE    (PE_CommonModel.Status in (${status})) AND (PE_CommonModel.NodeID NOT IN (225, 1135)) 
    AND (PE_CommonModel.ModelID = 1) AND (PE_CommonModel.LinkType = 0)`
    let sqlstr=''
    return new Promise(async resolve=>{  
   
      sqlstr=status=='2'?sql2:sql99
          let b = await gov.query(sqlstr);
    
          resolve(b[0])

    })
  }
  /**
   * 记录文件附件存放地址
   */
  static async GetAllArticleList(data) {
    return new Promise(async resolve => {
      let result = CommModel.findAndCountAll({
        order: [["GeneralID", "DESC"]],
        limit: data.limit,//每页多少条
        offset:data.offset,//跳过多少条
        attributes: [
          "GeneralID",
          "Title",
          "InputTime",
          "Inputer",
          "InputDepartmentName",
          "InputerDepID"
        ],
        where: {
          LinkType:0,
          Status: data.Status,
          NodeID: {
            [Op.in]: [data.NodeID], 
          }
         
        },
        include: [
          {
            model: Article,
            as: "A",
            attributes: ["Intro", "TitleIntact", "Content"]
          },
          {
            model: Files_attach,
            as: "Files",
            attributes: [
              "id",
              "fileType",
              "localhost",
              "path",
              "real_file",
              "caption",
              "name",
              "realfile_Name",
              "filewords"

            ]
          }
        ],
        distinct: true //设置此参数不会将 include 中的子项的count 加到 总数里
      });
      resolve(result);
    });
  }

  
  static async AddfilesBymobileApp(data) {
    return new Promise(async resolve => {
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
        InputDepartmentName: data.DepartmentName,
        InputerDepID: data.DepartmentID,
        Inputer: data.UserName,
        LinkType: 0,
        UpdateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
        CreateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
        Status: 99,
        InputTime: moment().format("YYYY-MM-DD HH:mm:ss"),
        SGType: 0,
        SGDataId: 0,
        EliteLevel: 0,
        Priority: 0,
        CommentAudited: 0,
        CommentUnAudited: 0,
        SigninType: 0,
        ClientType: 1,
     
      };
      let Article = {
        TitleIntact: data.firstauthor,
        Content: data.content,
        ID: data.GeneralID,
        CopyFrom:data.DepartmentName,
        Intro: data.intors,
        Keyword: data.keywords,
        OpenType: 0,
        siteUrl: ""
      };
      //       console.log(`-1-1--1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-`)

      let result = await ApprovalFormModel.V1CreateArticleAndCommomModel({
        A: Article,
        C: CommomModel
      });
      let fileinfo = await ApprovalFormModel.addFiles(data.files);

      console.log(result);
      resolve({ fileinfo, result });
    });
  }
  static async AddnewsByApp(data) {
    return new Promise(async resolve => {
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
        InputDepartmentName: data.DepartmentName,
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
        TitleIntact: data.firstauthor,
        Content: data.content,
        ID: data.GeneralID,
        Intro: data.intors,
        Keyword: data.keywords,
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
  static V1CreateArticleAndCommomModel(data) {
    let obj = new Object();
  
    let InputTime = moment().format("YYYY-MM-DD HH:mm:ss"); //2009-11-14 23:41:09.000
    data.C.InputTime = InputTime;

    let sql = `INSERT INTO [PE_CommonModel] ([GeneralID],[NodeID],[ModelID],[ItemID],[TableName],[Title],[InputDepartmentName],[InputerDepID],[Inputer],[Hits],[DayHits],[WeekHits],[MonthHits],[LinkType],[UpdateTime],[CreateTime],[Status],[EliteLevel],[Priority],[CommentAudited],[CommentUnAudited],[SigninType],[InputTime],[ShowCommentLink],[TitleHashKey],[SGType],[SGDataId],[ClientType],[DefaultPicUrl]) OUTPUT INSERTED.* VALUES
     (${data.C.GeneralID},${data.C.NodeID},1,${
      data.C.ItemID
    },N'PE_U_Article',N'${data.C.Title}',N'${data.C.InputDepartmentName}',N'${data.C.InputerDepID}',N'${
      data.C.Inputer
    }',0,0,0,0,0,N'${data.C.InputTime}',N'${data.C.InputTime}',N'${data.C.Status}',0,0,0,0,0,N'${
      data.C.InputTime
    }',0,4404120156978810400,0,0,${data.C.ClientType || 0},N'${data.C
      .DefaultPicUrl || ""}');`;

    return new Promise(async (resolve, reject) => {
      const a = await Article.create(data.A);
    
      let b = await gov.query(sql);
      console.log(a);
      obj = Object.assign(a, b, InputTime, { isok: true });
      resolve(obj);
    });
    //  await Article.create(data.A)
    //  await CommModel.create(data.C)
  }
  static CreateArticleAndCommomModel(data) {
    let obj = new Object();
    const now = Date.now();
    let InputTime = moment().format("YYYY-MM-DD HH:mm:ss"); //2009-11-14 23:41:09.000
    data.C.InputTime = InputTime;

    let sql = `INSERT INTO [PE_CommonModel] ([GeneralID],[NodeID],[ModelID],[ItemID],[TableName],[Title],[InputDepartmentName],[Inputer],[Hits],[DayHits],[WeekHits],[MonthHits],[LinkType],[UpdateTime],[CreateTime],[Status],[EliteLevel],[Priority],[CommentAudited],[CommentUnAudited],[SigninType],[InputTime],[ShowCommentLink],[TitleHashKey],[SGType],[SGDataId],[ClientType],[DefaultPicUrl]) OUTPUT INSERTED.* VALUES
     (${data.C.GeneralID},${data.C.NodeID},1,${
      data.C.ItemID
    },N'PE_U_Article',N'${data.C.Title}',N'${data.C.InputDepartmentName}',N'${
      data.C.Inputer
    }',0,0,0,0,0,N'${data.C.InputTime}',N'${data.C.InputTime} ',1,0,0,0,0,0,N'${
      data.C.InputTime
    }',0,4404120156978810400,0,0,${data.C.ClientType || 0},N'${data.C
      .DefaultPicUrl || ""}');`;

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
    const CommModelID = await CommModel.findOne({
      attributes: ["GeneralID"],
      order: [["GeneralID", "DESC"]]
    });
    return CommModelID;
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
        Sequelize.col("A.rednetUrl"),
        Sequelize.col("A.RednetID"),
        Sequelize.col("Node.Tips"),
        "GeneralID",
        "NodeID",
        "UpdateTime",
        "InputTime",
        "Title",
        "DefaultPicUrl",
        "Status",
        "Inputer"
      ],
      where: {
        GeneralID: ItemID,
        TableName: "PE_U_Article",
       
      },
      include: [
        {
          model: Article,
          as: "A",
          attributes: []
        }
        ,{
          model: Nodes,
          as: "Node",
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

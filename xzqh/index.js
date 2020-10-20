const db = require("../config/db");
const gov = db.gov;
// const Article = gov.import("../schema/PE_U_Article");
// const CommModel = gov.import("../schema/PE_CommonModel");
const Nodes = gov.import("../schema/PE_Nodes");
const Admin = gov.import("../schema/PE_Admin");
const AdminRoles = gov.import("../schema/PE_Admin_Roles");
const AdminContacter = gov.import("../schema/PE_Contacter");
const XZQH = gov.import("../schema/LIM_XZQH");
// const Files_attach = gov.import("../schema/LIM_files_ attachments");
const Sequelize = require("sequelize");
const moment = require("moment");
const { Promise } = require("sequelize");

const Op = Sequelize.Op
          // 在 [1, 2] 之中
// const jwtKoa = require('koa-jwt')
// Admin.belongsTo(AdminContacter, {
//   foreignKey: "UserName",
//   targetKey: "UserName",
//   as: "Contacter"
// });
// Admin.hasMany(AdminRoles, {
//   foreignKey: "AdminID",
//   targetKey: "AdminID",
//   as: "roles"
// });
class XzqhModel {
    static async  selectAll()
        {
            return new Promise(resolve=>{
                let result=XZQH.findAndCountAll()
                resolve(result)
            })          
        }

}

module.exports = XzqhModel;
 
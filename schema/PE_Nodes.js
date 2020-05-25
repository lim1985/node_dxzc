/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "PE_Nodes",
    {
      NodeID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      NodeIdentifier: {
        type: DataTypes.STRING,
        allowNull: true
      },
      NodeType: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      ParentID: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      ParentPath: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Depth: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      NodeName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Tips: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Description: {
        type: DataTypes.STRING,
        allowNull: true
      }
      // Content: {
      //   type: DataTypes.TEXT,
      //   allowNull: true
      // },
      // Stars: {
      //   type: DataTypes.STRING,
      //   allowNull: true
      // },
      // ReferenceNumber: {
      //   type: DataTypes.STRING,
      //   allowNull: true
      // },
      // siteUrl: {
      //   type: DataTypes.STRING,
      //   allowNull: true
      // },

      // OpenType: {
      //   type: DataTypes.STRING,
      //   allowNull: true
      // },
      // syContentID: {
      //   type: DataTypes.STRING,
      //   allowNull: true
      // },
      // IndexNumber: {
      //   type: DataTypes.STRING,
      //   allowNull: true
      // },
      // ApprovalForm: {
      //   type: DataTypes.TEXT,
      //   allowNull: true
      // },
      // IsApprovalForm: {
      //   type: DataTypes.BOOLEAN,
      //   allowNull: true
      // },
      // IsNotSend: {
      //   type: DataTypes.BOOLEAN,
      //   allowNull: true
      // },
      // IsSendShaoYang: {
      //   type: DataTypes.BOOLEAN,
      //   allowNull: true
      // },
      // DefaultPicUrls: {
      //   type: DataTypes.TEXT,
      //   allowNull: true
      // },
      // url_m: {
      //   type: DataTypes.TEXT,
      //   allowNull: true
      // },
      // siteUrl:{
      //   type: DataTypes.TEXT,
      //   allowNull: true
      // },
    },
    {
      tableName: "PE_Nodes"
    }
  );
};

/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "PE_U_Article",
    {
      ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      TitleIntact: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Subheading: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Author: {
        type: DataTypes.STRING,
        allowNull: true
      },
      CopyFrom: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Keyword: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Intro: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      PaginationType: {
        type: DataTypes.STRING,
        allowNull: true
      },
      MaxCharPerPage: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      Content: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      Stars: {
        type: DataTypes.STRING,
        allowNull: true
      },
      ReferenceNumber: {
        type: DataTypes.STRING,
        allowNull: true
      },
      siteUrl: {
        type: DataTypes.STRING,
        allowNull: true
      },

      OpenType: {
        type: DataTypes.STRING,
        allowNull: true
      },
      syContentID: {
        type: DataTypes.STRING,
        allowNull: true
      },
      IndexNumber: {
        type: DataTypes.STRING,
        allowNull: true
      },
      ApprovalForm: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      IsApprovalForm: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      IsNotSend: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      IsSendShaoYang: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      DefaultPicUrls: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      url_m: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      siteUrl: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      UrlType:{//省级媒体/0/1/2
        type: DataTypes.INTEGER,
        allowNull: true
      },
      RednetID:{
        type: DataTypes.INTEGER,
        allowNull: true
      },
      rednetUrl:{
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      tableName: "PE_U_Article"
    }
  );
};

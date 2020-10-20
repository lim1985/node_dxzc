/* jshint indent: 2 */

module.exports = function(Sequelize, DataTypes) {
  return Sequelize.define(
    "LIM_files_attachments",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      localhost: {
        type: DataTypes.STRING,
        allowNull: false
      },
      GeneralID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false
      },
      caption: {
        type: DataTypes.STRING,
        allowNull: false
      },
      real_file: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      extension: {
        type: DataTypes.STRING,
        allowNull: true
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      filewords: {
        type: DataTypes.STRING,
        allowNull: true
      },
      fileType: {
        type: DataTypes.STRING,
        allowNull: true
      },
      realfile_Name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      md5: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "图片md5值，防止上传重复图片"
      }
    },
    {
      timestamps: false,
      tableName: "LIM_files_attachments"
    }
  );
};

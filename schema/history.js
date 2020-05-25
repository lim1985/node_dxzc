/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "LIM_History",
    {
      ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      AdminUser: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Md5: {
        type: DataTypes.STRING,
        allowNull: true
      },
      GeneralID: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Action: {
        type: DataTypes.STRING,
        allowNull: true
      },
      NodeID: {
        type: DataTypes.STRING,
        allowNull: true
      },
      InputTime: {
        type: DataTypes.STRING,
        allowNull: true
      },
      contents: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true
      },
      nums: {
        type: DataTypes.STRING,
        allowNull: true
      },
      fulltitle: {
        type: DataTypes.STRING,
        allowNull: true
      },
      fubiaoti: {
        type: DataTypes.STRING,
        allowNull: true
      },
      KeyWords: {
        type: DataTypes.STRING,
        allowNull: true
      },
      auther: {
        type: DataTypes.STRING,
        allowNull: true
      },
      froms: {
        type: DataTypes.STRING,
        allowNull: true
      },
      introduce: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Defaultimg: {
        type: DataTypes.STRING,
        allowNull: true
      },
      ModelID: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      timestamps: false,
      tableName: "LIM_History"
    }
  );
};

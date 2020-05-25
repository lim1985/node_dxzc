/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "LIM_SY_channel",
    {
      websiteName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      websiteId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      channelName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      nodeid: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      channelkey: {
        type: DataTypes.STRING,
        allowNull: true
      },
      channelId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      outwebSite: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      timestamps: false,
      tableName: "LIM_SY_channel"
    }
  );
};

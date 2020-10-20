/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "PE_Contacter",
    {
      ContacterID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      ClientID: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      UserName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      TrueName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Mobile: {
        type: DataTypes.STRING,
        allowNull: true
      }    
    },
    {
      tableName: "PE_Contacter"
    }
  );
};

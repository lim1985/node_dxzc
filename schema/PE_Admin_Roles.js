/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "PE_Admin_Roles",
    {
      AdminID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      RoleID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      }       
    },
    {
      tableName: "PE_Admin_Roles"
    }
  );
};

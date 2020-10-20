/* jshint indent: 2 */

module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define(
      "LIM_XZQH",
      {
        id: {
          type: DataTypes.FLOAT,
          allowNull: true,
          primaryKey: true,
        },
        townstreetsName: {
          type: DataTypes.STRING,
          allowNull: true
        },
        townstreetsCode: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        communityvillageName: {
          type: DataTypes.STRING,
          allowNull: true
        },
        communityvillageCode: {
          type: DataTypes.STRING,
          allowNull: true
        },
        gridName: {
          type: DataTypes.STRING,
          allowNull: true
        },
        gridCode: {
          type: DataTypes.STRING,
          allowNull: true
        },
        Gridalias: {
          type: DataTypes.STRING,
          allowNull: true
        }      
      },
      {
        timestamps: false,
        tableName: "LIM_XZQH"
      }
    );
  };
  
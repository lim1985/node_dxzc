const Sequelize = require("sequelize");
const config = {
  database: "www.gov.cn",
  username: "sa",
  password: "aa//123",
  host: "59.230.230.48",
  port: 1433
};
const gov = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: "mssql", //'mysql'|'sqlite'|'postgres'|'mssql',
  timezone: "+",
  operatorsAliases: false,
  dialectOptions: {
    useUTC: false //for reading from database
  },
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  },
  define: {
    timestamps: false
  }
});
gov
  .authenticate() //连接测试
  .then(() => {
    console.log("数据库连接成功!");
  })
  .catch(err => {
    console.log(err);
  });
module.exports = {
  gov
};

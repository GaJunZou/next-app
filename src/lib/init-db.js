// init-db.js
const sequelize = require("./db2");
const { User } = require("./models");
(async () => {
  try {
    await sequelize.authenticate();
    console.log("数据库连接成功");

    // 同步模型到数据库
    await User.sync({
      force: true, // 强制重建表（生产环境禁用）
      logging: console.log,
    });

    console.log("User 表创建成功");

    // 创建测试用户
    await User.create({});

    console.log("测试用户创建成功");
    process.exit(0);
  } catch (error) {
    console.error("初始化失败:", error);
    process.exit(1);
  }
})();

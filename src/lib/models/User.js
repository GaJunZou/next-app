// models/User.js
// const bcrypt = require("bcryptjs");
import bcrypt from "bcryptjs";
import sequelize from "sequelize";
const DataTypes = sequelize.DataTypes;
export default (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: "用户唯一标识",
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "用户名不能为空",
          },
          len: {
            args: [3, 50],
            msg: "用户名长度需在3-50个字符之间",
          },
        },
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: { msg: "密码不能为空" },
        },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "邮箱格式不正确",
          },
          notEmpty: {
            msg: "邮箱不能为空",
          },
        },
      },
      last_login_time: {
        type: DataTypes.DATE,
        defaultValue: null,
        comment: "最后登录时间",
      },
      date_of_birth: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: {
            msg: "出生日期格式不正确",
          },
          isBefore: {
            args: new Date().toISOString(),
            msg: "出生日期不能晚于当前日期",
          },
        },
      },
      create_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        comment: "创建时间",
      },
    },
    {
      // 模型配置
      tableName: "users",
      timestamps: false, // 禁用自动时间戳
      paranoid: false, // 禁用软删除
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
      hooks: {
        beforeValidate: async (user) => {
          // 自动格式化日期字段
          if (user.date_of_birth && !(user.date_of_birth instanceof Date)) {
            user.date_of_birth = new Date(user.date_of_birth);
          }
        },
        beforeCreate: async (user, options) => {
          const salt = await bcrypt.genSaltSync(10);
          user.password = await bcrypt.hashSync(user.password, salt);
        },
        beforeUpdate: async (user, options) => {
          if (user.changed("password")) {
            const salt = await bcrypt.genSaltSync(10);
            user.password = await bcrypt.hashSync(user.password, salt);
          }
        },
      },
    }
  );
  // 添加实例方法
  User.prototype.comparePassword = function (candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
  };
  return User;
};

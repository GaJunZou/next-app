// models/index.js（正确初始化写法）
import sequelize from "sequelize";
import sequelizeDB from "../db2";
import User_Model from "./User";

const User = User_Model(sequelizeDB, sequelize.DataTypes);

// 添加实例方法
// ScheduleItem.belongsTo(Tag, {
//   foreignKey: "tag_id", // 表A的外键字段
//   targetKey: "id", // 表B的目标字段（非主键）
//   as: "tags", // 关联别名（用于查询时引用）
// });

export { User };

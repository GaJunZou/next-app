import { sendResponse } from "../helps";
import { User } from "@/lib/models";

export default async (req, res) => {
  try {
    // 同步模型到数据库
    await User.sync({
      force: true, // 强制重建表（生产环境禁用）
      logging: console.log,
    });

    console.log("User 表创建成功");

    // 创建测试用户
    const { dataValues } = await User.create(
      {
        username,
        email,
        password,
      }
    );

    console.log("测试用户创建成功");
    return sendResponse(res, {
      statusCode: 200,
      message: "create successful",
      data: dataValues,
    });
  } catch (error) {
    console.error("初始化失败:", error);
    return sendResponse(res, {
      statusCode: 500,
      message: "create error",
      data: error,
    });
  }
};
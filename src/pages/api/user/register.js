// app/api/auth/register/route.js
import { generateToken } from "@/lib/auth";
import { User, Tag } from "@/lib/models";
import { Op } from "sequelize";
import {
  sendResponse,
  setTokenCookie,
  toCamelCase,
  toSnakeCase,
} from "@api/helps";
import sequelize from "@/lib/db2";
const transaction = await sequelize.transaction();

export default async function POST(req, res) {
  try {
    const data = toSnakeCase(req.body);
    const username = data.username;
    const password = data.password;
    const email = data.email;
    // 验证用户是否存在
    const existingUser = await User.findOne({
      where: { [Op.or]: [{ email }] },
    });

    if (existingUser) {
      return sendResponse(res, {
        statusCode: 500,
        message: "该用户已注册！",
        data: {},
      });
    }

    const { dataValues } = await User.create(
      {
        username,
        email,
        password,
      },
      { transaction }
    );
    console.log("==============dataValues", dataValues);

    await transaction.commit();

    // // 生成Token
    const token = await generateToken({
      username: dataValues.username,
      email: dataValues.email,
      date_of_birth: dataValues.date_of_birth,
    });
    setTokenCookie(res, token);
    return sendResponse(res, {
      statusCode: 200,
      message: "",
      data: toCamelCase({
        id: dataValues.id,
        username: dataValues.username,
        email: dataValues.email,
      }),
    });
  } catch (error) {
    await transaction.rollback();
    return sendResponse(res, {
      statusCode: 500,
      message: error,
    });
  }
}
// app/api/auth/register/route.js
import { generateToken, decodeToken } from "@/lib/auth";
import { User } from "@/lib/models";
import { Op } from "sequelize";
import { NextResponse } from "next/server";
import { sendResponse, setTokenCookie, toCamelCase, toSnakeCase } from "@api/helps";

export default async function POST(req, res) {
  try {
    const data = toSnakeCase(req.body || {});
    let password = data.password;
    let email = data.email;
    let decodeData = {};
    if (req.cookies.auth_token) {
      decodeData = await decodeToken(req.cookies.auth_token);
      if (!decodeData.success) {
        setTokenCookie(res, null);
        return NextResponse.redirect(new URL("/start?type=login", req.url));
      } else {
        email = decodeData.data.email;
      }
    }
    // 验证用户是否存在
    if (!email) {
    }
    const existingUser = await User.findOne({
      where: { [Op.or]: [{ email }] },
    });

    if (!existingUser) {
      return sendResponse(res, {
        statusCode: 404,
        message: "该邮箱未注册！",
        data: {},
      });
    }
    const resolved = decodeData.data
      ? true
      : existingUser.comparePassword(password);

    if (!resolved) {
      return sendResponse(res, {
        statusCode: 200,
        message: "密码错误!",
        data: {},
      });
    }
    await existingUser.update({ last_login_time: new Date() });
    const userData = {
      username: existingUser.dataValues.username,
      email: existingUser.dataValues.email,
      date_of_birth: existingUser.dataValues.date_of_birth,
    };
    const token = await generateToken(userData);
    // Cookies.set("auth_token", token, { expires: 1 });
    // // 原生实现
    setTokenCookie(res, token);
    return sendResponse(res, {
      statusCode: 200,
      message: "success",
      data: toCamelCase(existingUser.dataValues),
    });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: error });
  }
}

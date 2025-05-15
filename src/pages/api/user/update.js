import { User } from "@/lib/models";
import { decodeToken } from "@/lib/auth";
import { NextResponse } from "next/server";
import {
  batchFieldHandle,
  sendResponse,
  setTokenCookie,
  toCamelCase,
  toSnakeCase,
} from "@api/helps";

export default async function POST(req, res) {
  try {
    const body = toSnakeCase(req.body);
    const id = body.id;
    // const { id } = params;
    // const token = await getToken({ req: request })
    // 验证权限
    if (req.cookies.auth_token) {
      const decodeData = await decodeToken(req.cookies.auth_token);
      if (!decodeData.success) {
        setTokenCookie(res, null);
        return NextResponse.redirect(new URL("/start?type=login", request.url));
      }
    }
    // const body = await req.json();
    const allowedFields = [
      // "id",
      "username",
      "password",
      "email",
      "last_login_time",
      "date_of_birth",
    ];
    const updateData = batchFieldHandle(allowedFields, body);
    const user = await User.findByPk(id);
    if (user) {
      const result = await user.update(updateData);
      return sendResponse(res, {
        statusCode: 200,
        message: "success",
        data: toCamelCase(result),
      });
    } else {
      return sendResponse(res, {
        statusCode: 500,
        message: "找不到用户",
        data: {},
      });
    }
  } catch (error) {
    console.error("error", error);
    return sendResponse(res, {
      statusCode: 500,
      message: error,
      data: {},
    });
  }
}

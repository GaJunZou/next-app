// lib/auth.js
// import jwt from "jsonwebtoken"; // jsonwebtoken 是 Nodejs Runtime 包,而Middleware 默认是Edge Runtime
// const JWT_SECRET = process.env.JWT_SECRET;
import { SignJWT, jwtVerify } from "jose";
import { NextResponse } from "next/server";

const JWT_SECRET = "your_jwt_secret_key";
const COOKIE_NAME = "auth_token";

const secretKey = new TextEncoder().encode(JWT_SECRET);

const generateToken = async (payload, expiresIn = 3600) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" }) // 使用 HS256 算法
    .setIssuedAt() // 设置签发时间
    .setExpirationTime(Math.floor(Date.now() / 1000) + expiresIn) // 设置过期时间
    .sign(secretKey); // 签名
};

const decodeToken = async (token) => {
  try {
    const data = await jwtVerify(token, secretKey);
    return {
      data: data.payload,
      success: true,
      msg: "",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      msg: error.code,
    };
  }
};

const excludePath = ["/user/login", "user/register"];

const verifyToken = async (url, req) => {
  if (excludePath.some((p) => url.includes(p))) {
    return NextResponse.next();
  }
  const token = req.cookies.get("auth_token")?.value;
  if (!token) {
    return NextResponse.json(
      {
        code: "MISSING_TOKEN",
        message: "未提供访问令牌",
      },
      { status: 401 }
    );
  }
  try {
    const { payload } = await jwtVerify(token, secretKey);
    console.log("payload", payload);
    // res.userData = payload;
    return NextResponse.next();
    // return payload;
  } catch (error) {
    handleJWTError(error);
  }
};

// 错误处理函数
const handleJWTError = (error) => {
  console.error("handleJWTError", error);
  const responseMap = {
    TokenExpiredError: {
      code: "TOKEN_EXPIRED",
      status: 401,
      message: "令牌已过期",
    },
    JsonWebTokenError: {
      code: "INVALID_TOKEN",
      status: 401,
      message: "无效的令牌",
    },
    NotBeforeError: {
      code: "TOKEN_NOT_ACTIVE",
      status: 401,
      message: "令牌尚未生效",
    },
  };

  const response = responseMap[error.name] || {
    code: "AUTH_FAILED",
    status: 500,
    message: "认证失败",
  };
  return NextResponse.json(
    {
      code: response.code,
      message: response.message,
    },
    { status: response.status || 500 }
  );
};

module.exports = {
  generateToken,
  verifyToken,
  decodeToken,
};

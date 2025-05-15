// middleware.js
import { NextResponse } from "next/server";
import { verifyToken, decodeToken } from "@/lib/auth";
export const config = {
  matcher: [
    "/debug/:path*",
    "/api/:path*",
  ], // 先指定一个测试路径
  // runtime: 'nodejs', // 强制使用 Node.js 运行时（默认是 'edge'）
};
export async function middleware(request, response) {
  // 打印请求信息
  console.log(`[Middleware] ${request.method} ${request.url}`);
  if (request.url.includes("/api/")) {
    return verifyToken(request.url, request);
  } else {
    return middlewareByPage(request, response);
  }
}

function middlewareByPage(request, response) {
  const token = request.cookies.get("auth_token")?.value;
  if (!token) {
    if (request.url.includes("/start")) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/start", request.url));
    }
  } else {
    return verifyToken(request.url, request);
  }
}

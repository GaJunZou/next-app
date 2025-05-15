const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const DATA_FILE = path.join(__dirname, "data.json");

// 创建服务器
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (parsedUrl.pathname === "/api/data") {
    switch (req.method) {
      case "GET":
        return handleGet(req, res, parsedUrl.query);
      case "POST":
        return handlePost(req, res);
      default:
        sendResponse(res, 405, { error: "Method not allowed" });
    }
  } else {
    sendResponse(res, 404, { error: "Endpoint not found" });
  }
});

// 启动服务器
server.listen(3000, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

// 辅助函数
function sendResponse(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  res.end(JSON.stringify(data));
}

function validateUserData(data) {
  // 实现数据验证
  return (
    data.name &&
    data.email &&
    typeof data.name === "string" &&
    typeof data.email === "string"
  );
}

function parseRequestBody(req) {
  // 处理 POST 请求的数据体
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

// 处理 GET 请求
async function handleGet(req, res, query) {
  try {
    const rawData = await fs.promises.readFile(DATA_FILE, "utf8");
    const jsonData = JSON.parse(rawData);

    if (query.id) {
      const itemId = parseInt(query.id);
      if (isNaN(itemId)) {
        return sendResponse(res, 400, { error: "Invalid ID format" });
      }

      const user = jsonData.users.find((u) => u.id === itemId);
      return user
        ? sendResponse(res, 200, user)
        : sendResponse(res, 404, { error: "User not found" });
    }

    sendResponse(res, 200, jsonData);
  } catch (err) {
    sendResponse(res, 500, { error: "Failed to read data" });
  }
}

// 处理 POST 请求
async function handlePost(req, res) {
  try {
    const requestBody = await parseRequestBody(req);

    if (!validateUserData(requestBody)) {
      return sendResponse(res, 400, {
        error: "Invalid user data",
        required: ["name", "email"],
      });
    }

    const rawData = await fs.promises.readFile(DATA_FILE, "utf8");
    const jsonData = JSON.parse(rawData);

    // 生成唯一ID
    const newId =
      jsonData.users.length > 0
        ? Math.max(...jsonData.users.map((u) => u.id)) + 1
        : 1;

    const newUser = {
      id: newId,
      ...requestBody,
      createdAt: new Date().toISOString(),
    };

    jsonData.users.push(newUser);

    await fs.promises.writeFile(DATA_FILE, JSON.stringify(jsonData, null, 2));
    sendResponse(res, 201, newUser);
  } catch (err) {
    sendResponse(res, 500, { error: "Failed to save data" });
  }
}

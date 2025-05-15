function sleep(s) {
  return new Promise((res) => {
    setTimeout(() => {
      res(true);
    }, s);
  });
}

function sendResponse(response, data) {
  const statusCode = data.statusCode;
  response.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  response.end(JSON.stringify(data));
}

function setTokenCookie(response, token) {
  const age = 24 * 60 * 60;
  const expires = new Date(0).toUTCString();
  if (token) {
    const cookieStr = `auth_token=${token};Max-Age=${age};Path=/;`;
    response.setHeader("Set-Cookie", cookieStr);
  } else {
    const cookieStr = `auth_token=;Expires=${expires};Max-Age=${age};Path=/;`;
    response.setHeader("Set-Cookie", cookieStr);
  }
}

function batchFieldHandle(allowedFields, sourceData) {
  const updateData = Object.keys(sourceData)
    .filter((key) => allowedFields.includes(key))
    .reduce((obj, key) => {
      obj[key] = sourceData[key];
      return obj;
    }, {});
  return updateData;
}

function toSnakeCase(obj) {
  function camelToSnake(key) {
    return key.replace(/([A-Z])/g, "_$1").toLowerCase();
  }
  if (typeof obj !== "object" || obj === null) {
    return obj; // 不是对象或数组，直接返回
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => toSnakeCase(item));
  }

  const newObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const snakeKey = camelToSnake(key);
      if (value instanceof Date) {
        newObj[snakeKey] = value;
      } else {
        newObj[snakeKey] = toSnakeCase(value);
      }
    }
  }
  return newObj;
}

function toCamelCase(obj) {
  function underscoreToCamel(str) {
    return str
      .replace(/(?:^|_+)(\w)/g, (match, p1) => p1.toUpperCase())
      .replace(/^./, (c) => c.toLowerCase());
  }
  if (typeof obj !== "object" || obj === null) {
    return obj; // 不是对象或数组，直接返回
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => toCamelCase(item));
  }

  const newObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const snakeKey = underscoreToCamel(key);
      if (value instanceof Date) {
        newObj[snakeKey] = value;
      } else {
        newObj[snakeKey] = toCamelCase(value);
      }
    }
  }
  return newObj;
}

export {
  sendResponse,
  setTokenCookie,
  batchFieldHandle,
  toSnakeCase,
  toCamelCase,
  sleep
};

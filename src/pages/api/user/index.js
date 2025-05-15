const { default: request } = require("@/utils/request");

const loginApi = async (data) => {
  const result = await request({
    method: "POST",
    url: "/api/user/login",
    data,
  });
  return result.data;
};

const logoutApi = async (data) => {
  const result = await request({
    method: "POST",
    url: "/api/user/logout",
    data,
  });
  return result.data;
};

const registerApi = async (data) => {
  const result = await request({
    method: "POST",
    url: "/api/user/register",
    data,
  });
  return result.data;
};

const updateUserApi = async (data) => {
  const result = await request({
    method: "POST",
    url: "/api/user/update",
    data,
  });
  return result.data;
};

export { loginApi, registerApi, updateUserApi, logoutApi };

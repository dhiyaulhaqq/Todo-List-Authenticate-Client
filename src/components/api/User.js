const host = "https://w27gz2-3300.csb.app";

const login = async (formData) => {
  const response = await fetch(`${host}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  // console.log({ data });
  if (data.status === "error") throw new Error(data.message);
  else return data;
};

const register = async (formData) => {
  const response = await fetch(`${host}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  if (data.status === "error") throw new Error(data.message);
  else return data;
};

const checkLogin = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${host}/protected`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const data = await response.json();
  return data;
};

const User = {
  login,
  register,
  checkLogin,
};

export default User;
export { login, register, checkLogin };

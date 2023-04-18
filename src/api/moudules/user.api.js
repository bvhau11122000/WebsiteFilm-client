import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const userEndpoints = {
  signin: "user/signin",
  signup: "user/signup",
  getInfo: "user/info",
  getAll: "user/all",
  passwordUpdate: "user/update-password",
  remove: ({ userId }) => `user/${userId}`
};

const userApi = {
  signin: async ({ username, password }) => {
    try {
      console.log("send request");
      const response = await publicClient.post(
        userEndpoints.signin,
        { username, password }
      );

      return { response };
    } catch (err) { console.log("err"); return { err }; }
  },
  signup: async ({ username, password, confirmPassword, displayName }) => {
    try {
      const response = await publicClient.post(
        userEndpoints.signup,
        { username, password, confirmPassword, displayName }
      );

      return { response };
    } catch (err) { return { err }; }
  },
  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getInfo);

      return { response };
    } catch (err) { return { err }; }
  },
  getAll: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getAll);

      return { response };
    } catch (err) { return { err }; }
  },
  passwordUpdate: async ({ password, newPassword, confirmNewPassword }) => {
    try {
      const response = await privateClient.put(
        userEndpoints.passwordUpdate,
        { password, newPassword, confirmNewPassword }
      );

      return { response };
    } catch (err) { return { err }; }
  },
  remove: async ({ userId }) => {
    try {
      const response = await privateClient.delete(userEndpoints.remove({ userId }));

      return { response };
    } catch (err) { return { err }; }
  },
};

export default userApi;
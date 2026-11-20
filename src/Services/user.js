import api from "@/configs/api";

const getProfileData = () =>
  api
    .get("/user/whoami")
    .then((res) => res || false)
    .catch((err) => err || false);

const getPostData = () => {
  return api.get("post/my");
};
export { getProfileData, getPostData };

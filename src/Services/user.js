import api from "@/configs/api";

const getProfileData = () =>
  api
    .get("/user/whoami")
    .then((res) => res || false)
    .catch((err) => err || false);

const getPostData = () => {
  return api.get("post/my");
};

const deletePost = (id) => api.delete(`/post/delete/${id}`);
export { getProfileData, getPostData, deletePost };

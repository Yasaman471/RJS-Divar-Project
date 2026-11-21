import api from "@/configs/api";

const getProfileData = () =>
  api
    .get("/user/whoami")
    .then((res) => res)
    .catch(() => false);

const getPostData = () => {
  return api.get("post/my");
};

const deletePost = (id) => api.delete(`/post/delete/${id}`);

const getAllpost = () => {
  return api.get("");
};

export { getProfileData, getPostData, deletePost, getAllpost };

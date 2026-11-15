import api from "@/configs/api";

const getProfileData = () => api.get("/user/whoami");

export default getProfileData;

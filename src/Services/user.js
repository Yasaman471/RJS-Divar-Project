import api from "@/configs/api";

const getProfileData = () =>
  api
    .get("/user/whoami")
    .then((res) => res || false)
    .catch((err) => err || false);

export default getProfileData;

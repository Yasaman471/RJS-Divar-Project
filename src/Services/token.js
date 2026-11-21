import api from "@/configs/api";
import { getcookie, removecookie } from "@/utils/cookie";

const getNewTokens = async () => {
  const refreshToken = getcookie("refreshToken");
  if (!refreshToken) return;

  try {
    const response = await api.post("auth/check-refresh-token", {
      refreshToken,
    });
    return { response };
  } catch (error) {
    return { error };
  }
};
const logout = () => {
  removecookie("accessToken");
  removecookie("refreshToken");
};
export { getNewTokens, logout };

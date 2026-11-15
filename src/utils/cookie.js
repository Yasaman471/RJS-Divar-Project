const setCookie = (tokens) => {
  document.cookie = `accessToken=${tokens.accessToken}; path=/; max-age=${1 * 24 * 60 * 60}`;
  document.cookie = `refreshToken=${tokens.refreshToken}; path=/; max-age=${30 * 24 * 60 * 60}`;
};

const getcookie = (cookieName) => {
  return document.cookie
    .split("; ")
    .find((token) => token.trim().split("=")[0] === cookieName)
    ?.split("=")[1];
};
export { setCookie, getcookie };

const ParseJwt = (token) => {
  return JSON.parse(atob(token.split(".")[1]));
};

export default ParseJwt;

import axios from "../backend/axios";
import useAuth from "./useAuth";
import ParseJwt from "../components/utils/ParseJwt";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.post("/api/token/refresh/", {
      withCredentials: true,
    });
    const access = response?.data?.access;
    const token = ParseJwt(access);
    const user_id = token.user_id;
    const username = token.username;
    const name = token.name;
    const last_login = token.last_login;
    setAuth({ access, user_id, username, name, last_login });
    setAuth((prev) => {
      return {
        ...prev,
        access: access,
        user_id: user_id,
        username: username,
        name: name,
        last_login: last_login,
      };
    });
    return response.data.access;
  };
  return refresh;
};

export default useRefreshToken;

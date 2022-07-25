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
    setAuth({ access, user_id, username, name });
    setAuth((prev) => {
      return {
        ...prev,
        access: access,
        user_id: user_id,
        username: username,
        name: name,
      };
    });
    return response.data.access;
  };
  return refresh;
};

export default useRefreshToken;

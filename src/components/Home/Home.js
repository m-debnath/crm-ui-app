import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { auth } = useAuth();
  const [myUser, setMyUser] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getMyUser = async (user_id) => {
      const response = await axiosPrivate.get(`/api/users/${user_id}/`, {
        signal: controller.signal,
      });
      isMounted && console.log(response.data);
      isMounted && setMyUser(await response?.data);
    };

    getMyUser(auth?.user_id).catch((err) => {
      if (err.code !== "ERR_CANCELED") {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    });

    return () => {
      isMounted = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>hi {myUser?.first_name}</h1>
    </div>
  );
};

export default Home;

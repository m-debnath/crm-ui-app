import { useState, useEffect, Suspense } from "react";
import LocaleContext from "../../context/LocaleContext";
import Loading from "../Loading";
import i18n from "../../i18n";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Header from "../Header/Header";

const Home = () => {
  const { auth } = useAuth();
  const [myUser, setMyUser] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [locale, setLocale] = useState(i18n.language);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getMyUser = async (user_id) => {
      const response = await axiosPrivate.get(`/api/users/${user_id}/`, {
        signal: controller.signal,
      });
      isMounted && setMyUser(response?.data);
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
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <Suspense fallback={<Loading />}>
        <div>
          <Header />
          <div className="mt-20">
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <Link to="/oach">Go to the Oach page</Link>
            <br />
          </div>
        </div>
      </Suspense>
    </LocaleContext.Provider>
  );
};

export default Home;

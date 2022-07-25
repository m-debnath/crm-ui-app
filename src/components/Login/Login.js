import brand_logo from "../../static/images/Tele2_Logo_main.png";

import { Suspense, useState, useRef, useEffect } from "react";

import ZoomIn from "../utils/animations/ZoomIn";
import useToggle from "../../hooks/useToggle";

import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import LocaleContext from "../../context/LocaleContext";
import Loading from "../Loading";

import lv_icon from "../../static/images/lv.svg";
import lt_icon from "../../static/images/lt.svg";
import ee_icon from "../../static/images/ee.svg";
import eu_icon from "../../static/images/eu.svg";
import placeholder_icon from "../../static/images/white.svg";

import axios from "../../backend/axios";
import useAuth from "../../hooks/useAuth";

import { useNavigate, useLocation } from "react-router-dom";

import ParseJwt from "../utils/ParseJwt";

const TOKEN_URL = "/api/token/";

const GetFlagIcon = (locale) => {
  switch (locale) {
    case "lv":
      return lv_icon;
    case "lt":
      return lt_icon;
    case "ee":
      return ee_icon;
    default:
      return eu_icon;
  }
};

const Login = () => {
  const debug = process.env.REACT_APP_DEBUG === "true";

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { t } = useTranslation();
  const [locale, setLocale] = useState(i18n.language);

  const userRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [persist, togglePersist] = useToggle("persist", false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErr(false);
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        TOKEN_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const access = response?.data?.access;
      const token = ParseJwt(access);
      const user_id = token.user_id;
      const username = token.username;
      const name = token.name;
      setAuth({ access, user_id, username, name });
      setUser("");
      setPwd("");
      setLoading(false);
      navigate(from, { replace: true });
    } catch (err) {
      setLoading(false);
      setErr(true);
      if (!err?.response) {
        setErrMsg("err_server_unreachable");
      } else if (err.response?.status === 400) {
        setErrMsg("err_missing_user_pwd");
      } else if (err.response?.status === 401) {
        setErrMsg("err_wrong_authentication");
      } else {
        setErrMsg("err_missing_authorization");
      }
    }
  };

  return (
    <>
      <LocaleContext.Provider value={{ locale, setLocale }}>
        <Suspense fallback={<Loading />}>
          <div className="h-full flex justify-around">
            <div className="mt-[5%] w-96 p-10 bg-white rounded-md shadow-md">
              <div className={`smallHeader ${debug ? "debugMode" : ""}`}>
                {process.env.NODE_ENV === "development" ? (
                  <img
                    className="shadow-sm shadow-slate-500 w-5 h-4"
                    src={GetFlagIcon(i18n.language)}
                    alt="Error"
                  />
                ) : (
                  <img className="stroke-transparent w-5 h-4" src={placeholder_icon} alt="" />
                )}
              </div>
              <div className={`brandLogo ${debug ? "debugMode" : ""}`}>
                <img className="mx-[auto]" src={brand_logo} alt="Tele2" />
              </div>
              <div
                className={`pt-2 pb-2 text-2xl text-center font-bold ${debug ? "debugMode" : ""}`}
              >
                {t("app_name")}
              </div>
              <div className={`flex justify-around h-5 ${debug ? "debugMode" : ""}`}>
                <ZoomIn show={err}>
                  <span className="errorMessage text-xs text-red-600">
                    {errMsg ? t(errMsg) : ""}
                  </span>
                </ZoomIn>
              </div>
              <div className={`${debug ? "debugMode" : ""}`}>
                <form onSubmit={handleSubmit}>
                  <div className="relative z-0 mb-6 mt-4 w-full group">
                    <input
                      type="text"
                      name="username"
                      id="floating_first_name"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
                      placeholder=" "
                      required
                      autoComplete="off"
                      ref={userRef}
                      onChange={(e) => setUser(e.target.value)}
                      onInvalid={(e) => e.preventDefault()}
                    />
                    <label
                      for="username"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      {t("username")}
                    </label>
                  </div>
                  <div className="relative z-0 mb-6 mt-4 w-full group">
                    <input
                      type="password"
                      name="password"
                      id="floating_password"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
                      placeholder=" "
                      required
                      autoComplete="off"
                      onChange={(e) => setPwd(e.target.value)}
                      onInvalid={(e) => e.preventDefault()}
                    />
                    <label
                      for="password"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      {t("password")}
                    </label>
                  </div>
                  <div className="flex justify-center items-center mb-4 mt-4">
                    <input
                      id="persist"
                      type="checkbox"
                      onChange={togglePersist}
                      checked={persist}
                      className="w-4 h-4 text-orange-400 bg-gray-100 rounded border-gray-300 focus:ring-orange-300 dark:focus:ring-orange-300 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="persist"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {t("persist_login")}
                    </label>
                  </div>

                  <div className="loginButtonContainer mt-4 mb-6 text-center">
                    {loading ? (
                      <button
                        disabled
                        type="button"
                        className="text-white bg-orange-400 hover:bg-orange-500 font-bold rounded-md px-6 py-2 dark:bg-orange-400 dark:hover:bg-orange-500 inline-flex items-center translate-y-0.5"
                      >
                        {t("login")}
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="text-white bg-orange-400 hover:bg-orange-500 font-bold rounded-md px-6 py-2 dark:bg-orange-400 dark:hover:bg-orange-500 focus:outline-none shadow-sm shadow-black active:shadow-none active:translate-y-0.5"
                      >
                        {t("login")}
                      </button>
                    )}
                    {/* <LoginButton type="submit">{t("login")}</LoginButton> */}
                  </div>
                </form>
              </div>
              <div
                className={`${
                  debug ? "debugMode" : ""
                }  flex justify-center gap-2 align-middle text-xs text-gray-500 text-center ${
                  err ? "animationMoveDown" : ""
                }`}
              >
                <p>
                  {t("version_info", {
                    env: process.env.NODE_ENV.replace(/^\w/, (c) => c.toUpperCase()),
                    ver: process.env.REACT_APP_VERSION,
                    last_upd: new Date(process.env.REACT_APP_LAST_UPDATED),
                  })}
                </p>
              </div>
            </div>
          </div>
        </Suspense>
      </LocaleContext.Provider>
    </>
  );
};

export default Login;

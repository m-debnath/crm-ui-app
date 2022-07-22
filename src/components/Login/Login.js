import { Suspense, useState, useRef, useEffect, useContext } from "react";
import "./Login.css";
import brand_logo from "../assets/images/Tele2_Logo_main.png";
import FieldLabel from "../utils/Forms/FieldLabel";
import LoginButton from "./LoginButton";
import ErrorNotify from "../utils/Notifications/ErrorNotify";
import Loading from "../Loading";

import placeholder_icon from "../assets/images/white.svg";

import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

import LocaleContext from "../../context/LocaleContext";

import lv_icon from "../assets/images/lv.svg";
import lt_icon from "../assets/images/lt.svg";
import ee_icon from "../assets/images/ee.svg";
import eu_icon from "../assets/images/eu.svg";

import axios from "../../backend/axios";
import AuthContext from "../../context/AuthContext";

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
  const { setAuth } = useContext(AuthContext);

  const { t } = useTranslation();
  const [locale, setLocale] = useState(i18n.language);

  const userRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        TOKEN_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.access;
      const refreshToken = response?.data?.refresh;
      setAuth({ user, pwd, accessToken, refreshToken });
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("err_server_unreachable_" + process.env.NODE_ENV);
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
      {success ? (
        <section>
          <h1>You are logged in!</h1>
        </section>
      ) : (
        <LocaleContext.Provider value={{ locale, setLocale }}>
          <Suspense fallback={<Loading />}>
            <div className="loginCard">
              {process.env.NODE_ENV === "development" ? (
                <img
                  className="shadow-sm shadow-slate-500 w-5 h-4"
                  src={GetFlagIcon(i18n.language)}
                  alt="Error"
                />
              ) : (
                <>
                  <img className="stroke-transparent w-5 h-4" src={placeholder_icon} alt="" />
                </>
              )}

              <div className="brandLogo">
                <img className="mx-[auto]" src={brand_logo} alt="Tele2" />
              </div>
              <div className="loginHeader">{t("app_name")}</div>

              <ErrorNotify errorMessage={errMsg ? t(errMsg) : ""} />

              <form onSubmit={handleSubmit.bind(this)}>
                <div className="mt-4">
                  <FieldLabel htmlFor="username">{t("username")}</FieldLabel>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    name="username"
                    id="userNameInput"
                    onChange={(e) => setUser(e.target.value)}
                    onInvalid={(e) => e.preventDefault()}
                    ref={userRef}
                    className="w-full t-2 mr-2 mt-2 p-2 rounded border-2 border-slate-200 shadow-inner hover:border-slate-600 hover:border-2"
                  />
                </div>
                <div className="mt-4">
                  <FieldLabel htmlFor="password">{t("password")}</FieldLabel>
                  <input
                    type="password"
                    required
                    autoComplete="off"
                    name="password"
                    id="userPasswordInput"
                    onChange={(e) => setPwd(e.target.value)}
                    onInvalid={(e) => e.preventDefault()}
                    className="w-full t-2 mr-2 mt-2 p-2 rounded border-2 border-slate-200 shadow-inner hover:border-slate-600 hover:border-2"
                  />
                </div>
                <div className="loginButtonContainer text-center">
                  <LoginButton type="submit">{t("login")}</LoginButton>
                </div>
              </form>
              <div className="loginFooter flex justify-center gap-2 align-middle">
                <p>
                  {t("version_info", {
                    env: process.env.NODE_ENV.replace(/^\w/, (c) => c.toUpperCase()),
                    ver: process.env.REACT_APP_VERSION,
                    last_upd: new Date(process.env.REACT_APP_LAST_UPDATED),
                  })}
                </p>
              </div>
            </div>
          </Suspense>
        </LocaleContext.Provider>
      )}
    </>
  );
};

export default Login;

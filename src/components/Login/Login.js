import "./Login.css";
import brand_logo from "../../static/images/Tele2_Logo_main.png";

import { Suspense, useState, useRef, useEffect } from "react";

import FieldLabel from "../utils/Forms/FieldLabel";
import LoginButton from "./LoginButton";
import ZoomIn from "../utils/animations/ZoomIn";

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

const TOKEN_URL = "/api/token/";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

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

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErr(false);
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
      const access = response?.data?.access;
      const token = parseJwt(access);
      const user_id = token.user_id;
      const username = token.username;
      const name = token.name;
      const last_login = token.last_login;
      setAuth({ user, access, user_id, username, name, last_login });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
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
          <div className="loginCard">
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
            <div className={`loginHeader ${debug ? "debugMode" : ""}`}>{t("app_name")}</div>
            <div className={`flex justify-around h-5 ${debug ? "debugMode" : ""}`}>
              <ZoomIn show={err}>
                <span className="errorMessage text-xs text-red-500">
                  {errMsg ? t(errMsg) : ""}
                </span>
              </ZoomIn>
            </div>
            <div className={`${debug ? "debugMode" : ""}`}>
              <form onSubmit={handleSubmit}>
                <div className="mt-2">
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
                    className="w-full t-2 mr-2 mt-2 mb-1 p-2 rounded border-2 border-slate-200 shadow-inner hover:border-slate-600 hover:border-2"
                  />
                </div>
                <div className="loginButtonContainer text-center">
                  <LoginButton type="submit">{t("login")}</LoginButton>
                </div>
              </form>
            </div>
            <div
              className={`${
                debug ? "debugMode" : ""
              } loginFooter flex justify-center gap-2 align-middle ${
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
        </Suspense>
      </LocaleContext.Provider>
    </>
  );
};

export default Login;

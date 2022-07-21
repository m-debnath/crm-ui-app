import { Suspense, useState, useRef, useEffect } from "react";
import "./Login.css";
import brand_logo from "../assets/images/Tele2_Logo_main.png";
import InputField from "../utils/Forms/InputField";
import FieldLabel from "../utils/Forms/FieldLabel";
import LoginButton from "./LoginButton";
// import ErrorNotify from "../utils/Notifications/ErrorNotify";
import Loading from "../Loading";

import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

import LocaleContext from "../../LocaleContext";

import lv_icon from "../assets/images/lv.svg";
import lt_icon from "../assets/images/lt.svg";
import ee_icon from "../assets/images/ee.svg";
import eu_icon from "../assets/images/eu.svg";

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
  const userRef = useRef();
  const { t } = useTranslation();
  const [locale, setLocale] = useState(i18n.language);

  // const errorRef = useRef();

  // const [username, setUserName] = useState("");
  // const [password, setPassword] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  // const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <Suspense fallback={<Loading />}>
        <div className="loginCard">
          <div className="brandLogo">
            <img className="mx-[auto]" src={brand_logo} alt="Tele2" />
          </div>
          <div className="loginHeader">{t("app_name")}</div>
          {/* <ErrorNotify errorMessage={t("err_wrong_authentication")} /> */}
          {/* <ErrorNotify errorMessage="You are not authorized to access this resource. Ask an administrator." />
        <ErrorNotify
          errorMessage={`The server is experiencing difficulties. ${process.env.REACT_APP_501_RESPONSE_MESSAGE}`}
        /> */}
          <form action="#" method="">
            <div className="mt-4">
              <FieldLabel htmlFor="username">{t("username")}</FieldLabel>
              <InputField
                local_ref={userRef}
                type="text"
                required
                autoComplete="off"
                name="username"
                id="userNameInput"
              />
            </div>
            <div className="mt-4">
              <FieldLabel htmlFor="password">{t("password")}</FieldLabel>
              <br />
              <InputField
                type="password"
                required
                autoComplete="off"
                name="password"
                id="userPasswordInput"
              />
            </div>
            <div className="loginButtonContainer text-center">
              <LoginButton disabled type="submit">
                {t("login")}
              </LoginButton>
            </div>
          </form>
          <div className="loginFooter flex justify-center gap-2 align-middle">
            <img
              className="shadow-sm shadow-slate-500 w-5 h-4"
              src={GetFlagIcon(i18n.language)}
              alt="Error"
            />
            {}
            <p>
              {t("version_info", {
                env: process.env.NODE_ENV.replace(/^\w/, (c) => c.toUpperCase()),
                ver: process.env.REACT_APP_VERSION,
                last_upd: new Date(process.env.REACT_APP_LAST_UPDATED),
              })}
            </p>
            <img
              className="shadow-sm shadow-slate-500 w-5 h-4"
              src={GetFlagIcon(i18n.language)}
              alt="Error"
            />
          </div>
        </div>
      </Suspense>
    </LocaleContext.Provider>
  );
};

export default Login;

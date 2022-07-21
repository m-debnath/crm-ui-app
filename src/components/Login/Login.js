import "./Login.css";
import brand_logo from "./Tele2_Logo_main.png";

const Login = () => {
  return (
    <>
      <div className="loginCard">
        <div className="brandLogo">
          <img className="mx-[auto]" src={brand_logo} alt="" />
        </div>
        <div className="loginHeader">OACH CRM Application</div>
        <form action="#" method="">
          <div className="loginInputGroup pb-3">
            <label className="userNameLabel col-span-1 my-[auto]" htmlFor="userNameInput">
              Username:
            </label>
            <input
              className="loginTextInput"
              type="text"
              autoComplete="on"
              name="userNameInput"
              id="userNameInput"
            />
          </div>
          <div className="loginInputGroup pb-2">
            <label className="userPasswordLabel col-span-1 my-[auto]" htmlFor="userPasswordInput">
              Passsword:
            </label>
            <input
              className="loginTextInput"
              type="password"
              autoComplete="off"
              name="userPasswordInput"
              id="userPasswordInput"
            />
          </div>
          <div className="loginButtonContainer text-center">
            <button className="loginButton" type="submit">
              Login
            </button>
          </div>
        </form>
        <div className="loginFooter">Version 0.1.0, Latvia Production, July 21, 2022.</div>
      </div>
    </>
  );
};

export default Login;

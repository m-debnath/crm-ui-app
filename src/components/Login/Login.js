import "./Login.css";
import brand_logo from "./Tele2_Logo_main.png";
import InputField from "../utils/Forms/InputField";
import FieldLabel from "../utils/Forms/FieldLabel";
import LoginButton from "./LoginButton";

const Login = () => {
  return (
    <>
      <div className="loginCard">
        <div className="brandLogo">
          <img className="mx-[auto]" src={brand_logo} alt="Tele2" />
        </div>
        <div className="loginHeader">OACH CRM Application</div>
        <form action="#" method="">
          <div className="flex justify-between mt-2">
            <FieldLabel htmlFor="userNameInput">Username:</FieldLabel>
            <InputField
              type="text"
              required
              autoComplete="on"
              name="userNameInput"
              id="userNameInput"
            />
          </div>
          <div className="flex justify-between mt-2">
            <FieldLabel htmlFor="userNameInput">Passsword:</FieldLabel>
            <InputField
              type="password"
              required
              autoComplete="off"
              name="userPasswordInput"
              id="userPasswordInput"
            />
          </div>
          <div className="loginButtonContainer text-center">
            <LoginButton type="submit">Login</LoginButton>
          </div>
        </form>
        <div className="loginFooter">Version 0.1.0, Latvia Production, July 21, 2022.</div>
      </div>
    </>
  );
};

export default Login;

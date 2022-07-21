import "./Login.css";
import brand_logo from "./Tele2_Logo_main.png";

const Login = () => {
  return (
    <>
      <div className="loginCard mt-36 m-[auto] w-96 p-10 bg-white-900 rounded-md shadow-md">
        <div className="brandLogo">
          <img className="mx-[auto]" src={brand_logo} alt="" />
        </div>
        <div className="loginHeader pt-2 pb-8 text-2xl text-center font-bold">
          OACH CRM Application
        </div>
        <form action="#" method="">
          <div className="userNameGroup grid gap-2 grid-cols-3 grid-rows-1 pb-3">
            <label className="userNameLabel col-span-1 my-[auto]" htmlFor="userNameInput">
              Username:
            </label>
            <input
              className="userNameInput col-span-2 p-2 rounded-md"
              type="text"
              autoComplete="on"
              name="userNameInput"
              id="userNameInput"
            />
          </div>
          <div className="userPasswordGroup grid gap-2 grid-cols-3 grid-rows-1 pb-2">
            <label className="userPasswordLabel col-span-1 my-[auto]" htmlFor="userPasswordInput">
              Passsword:
            </label>
            <input
              className="userPasswordInput col-span-2 p-2 rounded-md"
              type="password"
              autoComplete="off"
              name="userPasswordInput"
              id="userPasswordInput"
            />
          </div>
          <div className="loginButtonContainer text-center">
            <button
              className="loginButton disabled:bg-orange-300 disabled:shadow-none disabled:text-gray-200 mx-[auto] my-5 py-2 px-6 bg-orange-400 text-white font-bold rounded-md shadow-sm shadow-black hover:bg-orange-500 hover:text-gray-200 focus:bg-orange-500 focus:text-gray-200 active:shadow-none active:translate-y-0.5"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <div className="loginFooter text-xs text-gray-500 text-center">
          Version 0.1.0, Latvia Production, July 21, 2022.
        </div>
      </div>
    </>
  );
};

export default Login;

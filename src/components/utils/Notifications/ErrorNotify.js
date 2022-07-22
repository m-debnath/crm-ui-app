import error_icon from "../../assets/images/error-icon.svg";
import "./ErrorNotify.css";

const ErrorNotify = (props) => {
  return (
    <div className="p-1 max-w-sm mx-auto bg-white flex space-x-1">
      <div className="shrink-0"></div>
      <img
        className={props.errorMessage ? "loginErrorIcon w-6 h-[auto]" : "absolute left-[9999px]"}
        src={error_icon}
        alt="Error"
      />
      <div>
        <p
          className={
            props.errorMessage
              ? "text-slate-500 px-1 text-sm text-bold text-justify"
              : "absolute left-[9999px]"
          }
        >
          {props.errorMessage}
        </p>
      </div>
    </div>
  );
};

export default ErrorNotify;

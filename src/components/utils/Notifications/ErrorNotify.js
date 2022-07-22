import error_icon from "../../assets/images/error-icon.svg";
import "./ErrorNotify.css";

const ErrorNotify = (props) => {
  return (
    <div className="flex p-1 h-8 gap-2">
      <img
        className={
          props.errorMessage
            ? "loginErrorIcon transform transition-all opacity-100 w-6 h-[auto]"
            : "loginErrorIcon opacity-0 w-6 h-[auto]"
        }
        src={error_icon}
        alt="Error"
      />
      <div>
        <p
          className={
            props.errorMessage
              ? "transform transition-all text-black text-sm text-bold text-center h-6"
              : "text-transparent text-sm text-bold text-center h-6"
          }
        >
          {props.errorMessage}
        </p>
      </div>
    </div>
  );
};

export default ErrorNotify;

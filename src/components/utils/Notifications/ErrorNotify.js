import "./ErrorNotify.css";

const ErrorNotify = (props) => {
  return (
    <div>
      <p
        className={
          props.errorMessage
            ? "transform transition-all text-red-600 text-sm text-bold text-center h-7 pt-2"
            : "transform transition-all text-transparent text-sm text-bold text-center h-7 pt-2"
        }
      >
        {props.errorMessage}
      </p>
    </div>
  );
};

export default ErrorNotify;

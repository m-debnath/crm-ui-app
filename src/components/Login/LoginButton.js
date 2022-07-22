const LoginButton = (props) => {
  return (
    <button
      type={props.type}
      disabled={props.disabled}
      className="disabled:bg-orange-300 disabled:shadow-none disabled:mx-[auto] my-6 py-2 px-6 bg-orange-400 text-white font-bold rounded-md shadow-sm shadow-black hover:bg-orange-500  focus:bg-orange-500  active:shadow-none active:translate-y-0.5"
      {...props}
    >
      {props.children}
    </button>
  );
};

export default LoginButton;

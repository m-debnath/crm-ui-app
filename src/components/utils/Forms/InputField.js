const InputField = (props) => {
  return (
    <input
      ref={props.local_ref}
      required={props.required}
      className="w-48 t-2 mr-2 p-2 rounded border-2 border-slate-200 shadow-inner hover:border-slate-600 hover:border-2 "
      type={props.type}
      {...props}
    />
  );
};

export default InputField;

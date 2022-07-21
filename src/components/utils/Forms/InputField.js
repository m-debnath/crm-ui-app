const InputField = (props) => {
  return (
    <input
      required={props.required}
      className="w-48 t-2 mr-2 p-2 rounded-md border-[1px] shadow-inner hover:border-black hover:border-2"
      type={props.type}
      {...props}
    />
  );
};

export default InputField;

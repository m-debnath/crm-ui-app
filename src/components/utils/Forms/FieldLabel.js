const FieldLabel = (props) => {
  return (
    <label className="ml-2 t-2 my-[auto]" htmlFor={props.htmlFor} {...props}>
      {props.children}
    </label>
  );
};

export default FieldLabel;

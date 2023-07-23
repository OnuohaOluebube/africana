const Input = ({ className, label, title, type = "text", ...rest }) => {
  return (
    <>
      <label htmlFor={title}>{label} </label>
      <input
        {...rest}
        type={type}
        title={title}
        className={"pri-input  " + className}
      />
    </>
  );
};
export default Input;

import PuffLoader from "react-spinners/PuffLoader";

const Button = ({ name, className, loading, ...rest }) => {
  return (
    <button {...rest} className={`pri-btn ` + className} type="submit">
      {" "}
      {name}
      {loading && <PuffLoader color="white" size={30} radius={1} height={10} />}
    </button>
  );
};

export default Button;

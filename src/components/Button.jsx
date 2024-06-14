const Button = ({
  children,
  clickFunc,
  disabled,
  isLoading,
  type = "button",
  varient,
}) => {
  return (
    <button
      onClick={clickFunc}
      type={type}
      disabled={disabled}
      className={`${
        varient === "outlined"
          ? "bg-white text-green-600 "
          : "bg-green-600 text-white"
      } border border-green-600 px-4 py-1 rounded-lg font-medium active:scale-95 ${
        disabled ? "opacity-50 cursor-not-allowed" : "opacity-100 "
      }`}
    >
      {children}
      {isLoading && "..."}
    </button>
  );
};

export default Button;

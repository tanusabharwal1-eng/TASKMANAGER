const Button = ({
  type = "button",
  label,
  onClick,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`login-button ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
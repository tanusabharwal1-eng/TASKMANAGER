import React from "react";
import clsx from "clsx";

const Textbox = React.forwardRef(
  (
    {
      type = "text",
      placeholder,
      label,
      className,
      register,
      name,
      error,
    },
    ref
  ) => {
    return (
      <div className="textbox-container">

        {label && (
          <label
            htmlFor={name}
            className="textbox-label"
          >
            {label}
          </label>
        )}

        <input
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          ref={ref}
          {...register}
          aria-invalid={error ? "true" : "false"}
          className={clsx(
            "textbox-input",
            className
          )}
        />

        {error && (
          <span className="error-message">
            {error}
          </span>
        )}

      </div>
    );
  }
);

export default Textbox;
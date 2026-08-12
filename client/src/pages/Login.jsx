import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Textbox from "../components/Textbox";
import Button from "../components/Button";

const Login = () => {
  const { user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  // Temporary login
  const submitHandler = async (data) => {
    console.log("Login data:", data);

    // Temporary authentication
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("userEmail", data.email);

    // Go to dashboard
    navigate("/dashboard");
  };

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("loggedIn");

    if (user || loggedIn === "true") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="login-page">

      {/* LEFT SIDE */}
      <div className="login-left">

        <span className="tagline">
          Manage all your tasks in one place
        </span>

        <h1 className="main-title">
          <span>Cloud-Based</span>
          <span>Task Manager</span>
        </h1>

        {/* Rotating Circle */}
        <div className="circle"></div>

      </div>


      {/* RIGHT SIDE */}
      <div className="login-right">

        <div className="login-card">

          <h2 className="welcome-title">
            Welcome Back!
          </h2>

          <p className="welcome-text">
            Keep all your credentials safe.
          </p>

          <form
            onSubmit={handleSubmit(submitHandler)}
            className="login-form"
          >

            {/* EMAIL */}
            <Textbox
              type="email"
              placeholder="email@example.com"
              name="email"
              label="Email Address"
              className="login-input"
              register={register("email", {
                required: "Email Address is required",
              })}
              error={errors.email?.message}
            />


            {/* PASSWORD */}
            <Textbox
              type="password"
              placeholder="your password"
              name="password"
              label="Password"
              className="login-input"
              register={register("password", {
                required: "Password is required",
              })}
              error={errors.password?.message}
            />


            {/* FORGOT PASSWORD */}
            <div className="forgot-password">
              Forgot Password?
            </div>


            {/* BUTTON */}
            <Button
              type="submit"
              label="Submit"
            />

          </form>

        </div>

      </div>

    </div>
  );
};

export default Login;
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { useSelector } from "react-redux";

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const submitHandler = async (data) => {
    console.log("submit");
  };

  useEffect(() => {
    user && navigate("/dashboard");
  }, [user]);

  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]'>
      <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
        {/* left side */}
        <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
          <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
            <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base bordergray-300 text-gray-600'>
              Manage all your task in one place!
            </span>
            <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700'>
              <span>Cloud-Based</span>
              <span>Task Manager</span>
            </p>

            <div className='cell'>
              <div className='circle rotate-in-up-left'></div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14'
          >
            <div className=''>
              <p className='text-blue-600 text-3xl font-bold text-center'>
                Welcome back!
              </p>
              <p className='text-center text-base text-gray-700 '>
                Keep all your credential safge.
              </p>
            </div>

            <div className='flex flex-col gap-y-5'>
              <Textbox
                placeholder='email@example.com'
                type='email'
                name='email'
                label='Email Address'
                className='w-full rounded-full'
                register={register("email", {
                  required: "Email Address is required!",
                })}
                error={errors.email ? errors.email.message : ""}
              />
              <Textbox
                placeholder='your password'
                type='password'
                name='password'
                label='Password'
                className='w-full rounded-full'
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password ? errors.password.message : ""}
              />

              <span className='text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer'>
                Forget Password?
              </span>

              <Button
                type='submit'
                label='Submit'
                className='w-full h-10 bg-blue-700 text-white rounded-full'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;import { useEffect } from "react";
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
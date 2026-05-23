import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../features/user/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { removeErrors, removeSuccess } from "../features/user/userSlice";
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { error, loading, success } = useSelector((state) => state.user);
  const redirectTo = location.state?.from || "/profile";
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success("Successfully Logged In", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      navigate(redirectTo, { replace: true });
    }
  }, [dispatch, navigate, redirectTo, success]);
  return (
    <div className="flex items-center min-h-screen bg-linear-to-br from-slate-100 via-white to-blue-50 px-4 py-12">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-white/70 bg-white/90 p-8 shadow-xl shadow-blue-100 backdrop-blur">
        <form className="space-y-5" onSubmit={loginSubmit}>
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Please enter your details to sign in
            </p>
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <p className="text-center text-sm text-gray-600">
            <Link
              to="/forgot-password"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Forgot Password?
            </Link>
          </p>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Sign up Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

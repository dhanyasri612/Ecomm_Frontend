import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../features/user/userSlice";
import { removeErrors, removeSuccess } from "../features/user/userSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, success, message } = useSelector((state) => state.user);
  const [preview, setPreview] = useState(
    "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_incoming&w=740&q=80",
  );
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState("");
  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const registerNow = (e) => {
    e.preventDefault();
    if (!user.name || !user.email || !user.password) {
      toast.error("Please enter the details..", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    const myForm = new FormData();
    myForm.set("name", user.name);
    myForm.set("email", user.email);
    myForm.set("password", user.password);
    myForm.set("avatar", avatar);
    //console.log([...myForm.entries()]);
    dispatch(register(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success(message || "Registered successfully", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      navigate("/login");
    }
  }, [dispatch, success, message]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-blue-50 px-4 py-12">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-white/70 bg-white/90 p-8 shadow-xl shadow-blue-100 backdrop-blur">
        <form
          encType="multipart/form-data"
          className="space-y-5"
          onSubmit={registerNow}
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Create Account
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Join us and start your shopping journey
            </p>
          </div>

          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={user.name}
              placeholder="Enter your username"
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
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
              name="email"
              value={user.email}
              placeholder="Enter your email"
              onChange={handleChange}
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
              value={user.password}
              placeholder="Create a strong password"
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-gray-300 bg-gray-50 text-xs text-gray-400">
                <img
                  src={preview}
                  alt="Profile preview"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <p className="text-xs text-gray-500">Upload profile image</p>
            </div>

            <label
              htmlFor="avatar"
              className="flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-blue-300 bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
            >
              <span>Choose profile image</span>
              <input
                name="avatar"
                accept="image/*"
                id="avatar"
                type="file"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Sign up
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Sign in Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  removeErrors,
  removeSuccess,
  updateProfile as updateUserProfile,
} from "../features/user/userSlice";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error, success, message } =
    useSelector((state) => state.user);
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success(message || "Profile updated successfully", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      navigate("/profile");
    }
  }, [dispatch, message, navigate, success]);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        setAvatarPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name || user?.name || "");
    formData.set("email", email || user?.email || "");
    if (avatar) {
      formData.set("avatar", avatar);
    }

    dispatch(updateUserProfile(formData));
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 sm:px-6 lg:px-18 pt-24">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 drop-shadow-sm">
            Update Profile
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
          <div className="bg-white py-10 px-6 shadow-xl rounded-2xl sm:px-12 border border-gray-100">
            <form
              encType="multipart/form-data"
              className="w-full"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col items-center">
                <div className="relative h-32 w-32 mb-6 mt-2">
                  <img
                    src={
                      avatarPreview ||
                      user?.avatar?.url ||
                      "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                    }
                    alt="Profile preview"
                    className="rounded-full w-full h-full object-cover border-4 border-indigo-100 shadow-lg"
                  />
                </div>

                <label
                  htmlFor="avatar"
                  className="mb-7 cursor-pointer rounded-lg border border-dashed border-indigo-300 bg-indigo-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 transition hover:bg-indigo-100"
                >
                  Choose New Photo
                </label>
                <input
                  id="avatar"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>

              <div className="w-full space-y-5">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <label
                    htmlFor="name"
                    className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 block"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    placeholder="Enter full name"
                  />
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 block"
                  >
                    E mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                >
                  {loading ? "Updating..." : "Update Profile"}
                </button>
                <Link
                  to="/profile"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;

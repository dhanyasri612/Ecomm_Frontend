import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  removeErrors,
  removeSuccess,
  updatePassword as updateUserPassword,
} from "../features/user/userSlice";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error, success, message } = useSelector(
    (state) => state.user,
  );
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      toast.success(message || "Password updated successfully", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      navigate("/profile");
    }
  }, [dispatch, message, navigate, success]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateUserPassword({ oldPassword, newPassword, confirmPassword }),
    );
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 sm:px-6 lg:px-18 pt-24">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 drop-shadow-sm">
            Change Password
          </h2>
          <p className="mt-3 text-center text-sm text-gray-500">
            Choose a new password that is different from the current one.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
          <div className="bg-white py-10 px-6 shadow-xl rounded-2xl sm:px-12 border border-gray-100">
            <form className="w-full space-y-5" onSubmit={handleSubmit}>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <label
                  htmlFor="oldPassword"
                  className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 block"
                >
                  Current Password
                </label>
                <input
                  id="oldPassword"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  placeholder="Enter current password"
                  required
                />
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <label
                  htmlFor="newPassword"
                  className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 block"
                >
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  placeholder="Enter new password"
                  required
                />
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <label
                  htmlFor="confirmPassword"
                  className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 block"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  placeholder="Re-enter new password"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Updating..." : "Update Password"}
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
  )
}

export default UpdatePassword
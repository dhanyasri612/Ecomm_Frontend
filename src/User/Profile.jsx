import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(()=>{
    if(isAuthenticated===false){
        navigate("/login");
    }
  },[isAuthenticated])
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 sm:px-6 lg:px-18 pt-24">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 drop-shadow-sm">
            My Profile
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
          <div className="bg-white py-10 px-6 shadow-xl rounded-2xl sm:px-12 flex flex-col items-center border border-gray-100">
            <div className="relative h-36 w-36 mb-8 mt-2">
              <img
                src={user?.avatar?.url}
                alt={user?.name}
                className="rounded-full w-full h-full object-cover border-4 border-indigo-100 shadow-lg"
              />
            </div>
            <div className="w-full space-y-6">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
                  Full Name
                </h4>
                <p className="text-xl font-bold text-gray-800">{user?.name}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
                  E mail
                </h4>
                <p className="text-xl font-bold text-gray-800">{user?.email}</p>
              </div>
            </div>
            <div className="w-full mt-3 flex space-x-4">
              <Link
                to="/profile/update"
                className="block w-full rounded-l bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
              >
                Edit Profile
              </Link>
              <Link
                to="/password/update"
                className="block w-full rounded-l bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
              >
                Change Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

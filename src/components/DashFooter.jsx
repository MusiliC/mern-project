import React from "react";
import { HomeIcon } from "@heroicons/react/24/solid";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashFooter = () => {
  const { username, status } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const goHome = () => {
    navigate("/dash");
  };

  let goHomeButton = null;
  if (pathname !== "/dash") {
    goHomeButton = (
      <button title="Home" onClick={goHome}>
        <HomeIcon className="h-5 w-5 font-semibold text-primary-500" />
      </button>
    );
  }

  return (
    <footer className="w-full ">
      <div className="md:w-5/6 mx-auto ">
        <div className="h-[2px] rounded-full my-3 bg-black"></div>
        <div className="flex space-x-3 mx-2 md:mx-0 items-center">
          {goHomeButton}
          <p className="font-semibold text-primary-500 text-sm md:text-base ">
            Current User: <span className="font-bold">{username}</span>
          </p>
          <div className="font-semibold text-primary-500 text-sm md:text-base ">
            <p>
              Status: <span className="font-bold">{status}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DashFooter;

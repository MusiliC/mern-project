import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSendLogOutMutation } from "../features/auth/AuthApiSlice";
import useAuth from "../hooks/useAuth";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  const { isManager, isAdmin } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogOutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  //admin roles

  const onNewNoteClicked = () => navigate("/dash/notes/new");
  const onNewUserClicked = () => navigate("/dash/users/new");
  const onNotesClicked = () => navigate("/dash/notes");
  const onUsersClicked = () => navigate("/dash/users");

  const onLogOutClicked = () => sendLogout();

 let dashClass;
 if (
   !DASH_REGEX.test(pathname) &&
   !NOTES_REGEX.test(pathname) &&
   !USERS_REGEX.test(pathname)
 ) {
   dashClass = "dash-header__container--small";
 }

  // admin buttons

  let newNoteButton = null;
  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = (
      <button className="smallButton" onClick={onNewNoteClicked}>
        New Note
      </button>
    );
  }

  let newUserButton = null;
  if (NOTES_REGEX.test(pathname)) {
    newUserButton = (
      <button className="smallButton" onClick={onNewUserClicked}>
        New User
      </button>
    );
  }

  let userButton = null;
  if (isManager || isAdmin) {
    if (NOTES_REGEX.test(pathname) && pathname.includes("/dash")) {
      userButton = (
        <button className="smallButton" onClick={onUsersClicked}>
          User
        </button>
      );
    }
  }

  let notesButton = null;

  if (NOTES_REGEX.test(pathname) && pathname.includes("/dash")) {
    notesButton = (
      <button className="smallButton" onClick={onNotesClicked}>
        User
      </button>
    );
  }

  const logOutButton = (
    <button className="smallButton" onClick={onLogOutClicked}>
      Log Out
    </button>
  );

  const errClass = isError ? "errMsg" : "offscreen";

  let buttonContent
  if(isLoading){
    buttonContent = <p>Logging out..</p>
  }else{
    buttonContent = (
      <>
  
      {logOutButton}
      </>
    )
  }

  return (
    <>
      <div className="md:w-5/6 mx-auto">
        <p>{error?.data?.message}</p>
      </div>

      <header className="w-full pt-8">
        <div className="md:w-5/6 mx-auto">
          <div className={`flex justify-between sm:w-[95%] md:w-full mx-auto ${dashClass}`}>
            <Link to={"/dash"}>
              <h1 className="text-primary-500 mx-2 md:mx-0 text-xl font-semibold md:text-2xl">
                techNotes
              </h1>
            </Link>
            <nav>{buttonContent}</nav>
          </div>
          <div className="h-[2px] rounded-full my-3 bg-black"></div>
        </div>
      </header>
    </>
  );
};

export default DashHeader;

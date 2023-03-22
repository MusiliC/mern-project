import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import useAuth from "../../hooks/useAuth";

const Welcome = () => {
  const { username, isManager, isAdmin } = useAuth();

  const date = new Date();
  const today = moment().format("MMMM Do YYYY");

  return (
    <section className="w-full min-h-[70vh]">
      <div className="w-5/6 mx-auto">
        <p className="text-secondary-500 text-sm md:text-base font-bold">
          {today}
        </p>
        <p className="text-lg font-semibold my-4 md:text-xl">
          Welcome {username}!
        </p>
        <p className="mb-3 text-sm font-semibold flex items-center space-x-1">
          <ArrowSmallRightIcon className="h-5 w-5 font-semibold" />
          <Link to={"/dash/notes"} className="md:text-xl text-primary-500">
            View techNotes
          </Link>
        </p>
        <p className="mb-3 text-sm  font-semibold flex items-center space-x-1">
          <ArrowSmallRightIcon className="h-5 w-5 font-semibold" />
          <Link to={"/dash/notes/new"} className="md:text-xl text-primary-500">
            Add A new techNote
          </Link>
        </p>
        {(isManager || isAdmin) && (
          <p className="mb-3 font-semibold flex items-center text-sm   space-x-1">
            <ArrowSmallRightIcon className="h-5 w-5 font-semibold" />
            <Link to={"/dash/users"} className="md:text-xl text-primary-500">
              View User Settings
            </Link>
          </p>
        )}

        {(isManager || isAdmin) && (
          <p className="mb-3 font-semibold flex items-center text-sm   space-x-1">
            <ArrowSmallRightIcon className="h-5 w-5 font-semibold" />
            <Link
              to={"/dash/users/new"}
              className="md:text-xl text-primary-500"
            >
              Add A new User
            </Link>
          </p>
        )}
      </div>
    </section>
  );
};

export default Welcome;

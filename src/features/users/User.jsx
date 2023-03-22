import React from "react";
import { useNavigate } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";

const User = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));
  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`);

    const userRoleString = user.roles.toString().replaceAll(" , ", " ,");

    const cellStatus = user.active ? "" : "table_cell_inactive";

    return (
      <tr className="bg-white ">
        <td className="py-2 px-1.5 lg:px-6 border">{user.username}</td>
        <td className="py-2 px-1.5 lg:px-6 border">{userRoleString}</td>
        <td className="py-2 px-1.5 lg:px-6 border">
          <button
            className="rounded-md bg-primary-500 font-semibold text-sm md:text-base text-white px-5 py-1 hover:bg-primary-300 hover:text-black"
            onClick={handleEdit}
          >
            Edit
          </button>
        </td>
      </tr>
    );
  } else return null;

  return <div>User</div>;
};

export default User;

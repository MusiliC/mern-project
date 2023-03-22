import React from "react";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import { useParams } from "react-router-dom";
import EditUserForm from "./EditUserForm";
import PulseLoader from "react-spinners/PulseLoader"

const EditUser = () => {
  const { id } = useParams();

  const user = useSelector((state) => selectUserById(state, id));

  const content = user ? <EditUserForm user={user} /> : < PulseLoader color="#FFF"/>;

  return content;
};

export default EditUser;

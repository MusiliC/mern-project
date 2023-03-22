import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersApiSlice.js";
import NewNoteForm from "./NewNoteForm.jsx";

const NewNote = () => {
  const users = useSelector(selectAllUsers);

  if (!users?.length) return (
    <p className="w-5/6 mx-auto min-h-[70vh] text-sm md:text-base title">
      Not currently available
    </p>
  );
  

  const content = <NewNoteForm users={users} />;

  return content;
};

export default NewNote;

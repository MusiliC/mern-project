import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNoteById } from "../notes/notesApiSlice.js";
import { selectAllUsers } from "../users/usersApiSlice";
import EditNoteForm from "./EditNoteForm.jsx";

const EditNote = () => {
  const { id } = useParams();

  const note = useSelector((state) => selectNoteById(state, id));
  const users = useSelector(selectAllUsers);

  const content =
    note && users ? (
      <EditNoteForm note={note} users={users} />
    ) : (
      <p className="loading">Loading...</p>
    );

  return content;
};

export default EditNote;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNoteById } from "./notesApiSlice";

const Note = ({ noteId }) => {
  const note = useSelector((state) => selectNoteById(state, noteId));
  const navigate = useNavigate();

  if (note) {
    const created = new Date(note.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const updated = new Date(note.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const handleEdit = () => navigate(`/dash/notes/${noteId}`);

    return (
      <tr className="bg-white ">
        <td className="py-2 px-1.5 lg:px-6 border">
          {note.completed ? (
            <span className="text-orange-600 font-semibold">Completed</span>
          ) : (
            <span className="text-green-500 font-semibold">Open</span>
          )}
        </td>
        <td className="py-2 hidden lg:table-cell px-1.5 lg:px-6 border">
          {created}
        </td>
        <td className="py-2 hidden lg:table-cell px-1.5 lg:px-6 border">
          {updated}
        </td>
        <td className="py-2 px-1.5 lg:px-6 border">{note.title}</td>
        <td className="py-2 hidden  lg:table-cell px-1.5 lg:px-6 border">
          {note.username}
        </td>
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
};

export default Note;

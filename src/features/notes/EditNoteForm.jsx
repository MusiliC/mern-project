import React, { useEffect, useState } from "react";
import {
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} from "../notes/notesApiSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const EditNoteForm = ({ users, note }) => {
  const { isManager, isAdmin } = useAuth();
  const [updateNewNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation();

  const [
    deleteNote,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteNoteMutation();

  const navigate = useNavigate();

  const [user, setUser] = useState(note.user);
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [completed, setCompleted] = useState(note.completed);

  const onUserChanged = (e) => setUser(e.target.value);
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onCompletedChanged = (e) => setCompleted((prev) => !prev);

  //delete
  const onDeleteNote = async () => {
    await deleteNote({ id: note.id });
  };

  //update
  const onUpdateNote = async (e) => {
    e.preventDefault();
    await updateNewNote({ id: note.id, user, title, text, completed });
  };

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      setText("");
      setUser("");
      navigate("/dash/notes");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const options = users.map((user) => {
    return (
      <option value={user.id} key={user.id}>
        {user.username}
      </option>
    );
  });

  return (
    <section className="w-5/6 mx-auto min-h-[70vh] text-sm md:text-base">
      <div className=" md:w-3/4 lg:w-1/2">
        <div>
          <p className="errClass">{error?.data?.message}</p>
        </div>
        <div>
          <form action="">
            <div>
              <h2 className="text-base md:text-lg my-5 font-semibold">
                Edit Note
              </h2>

              <div className="flex justify-between my-4">
                {isLoading ? (
                  <button className="smallButton" onClick={onUpdateNote}>
                    Loading..
                  </button>
                ) : (
                  <button className="smallButton" onClick={onUpdateNote}>
                    Save
                  </button>
                )}

                {(isAdmin || isManager) && (
                  <button className="deleteButton" onClick={onDeleteNote}>
                    Delete
                  </button>
                )}
              </div>
            </div>
            {/* notes */}
            <div>
              <label htmlFor="">Note Title:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={title}
                className="inputStyles"
                onChange={onTitleChanged}
              />
            </div>
            {/* text */}
            <div>
              <label htmlFor="">Note text:</label>
              <input
                type="text"
                id="password"
                className="inputStyles"
                name="password"
                value={text}
                onChange={onTextChanged}
              />
            </div>
            {/* completed check box */}
            <div className="flex items-center space-x-2 my-2">
              <label htmlFor="">Active:</label>
              <input
                type="checkbox"
                className="rounded h-5 w-5  "
                checked={completed}
                onChange={onCompletedChanged}
              />
            </div>
            {/* users */}
            <div>
              <label htmlFor="">Assigned to:</label>
              <select
                name="user"
                id="user"
                className="inputStyles"
                value={user}
                onChange={onUserChanged}
              >
                {options}
              </select>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditNoteForm;

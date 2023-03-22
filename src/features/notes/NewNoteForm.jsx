import React, { useEffect, useState } from "react";
import { useAddNewNoteMutation } from "../notes/notesApiSlice";
import { useNavigate } from "react-router-dom";

//user, title, text

const NewNoteForm = ({ users }) => {
  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation();

  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const onUserChanged = (e) => setUser(e.target.value);
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);

  useEffect(() => {
    if (isSuccess) {
      setUser("");
      setTitle("");
      setText("");
      navigate("/dash/notes");
    }
  }, [isSuccess, navigate]);

  const onNoteSave = async (e) => {
    e.preventDefault();
    await addNewNote({ user, title, text });
  };

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
          <form action="" onSubmit={onNoteSave}>
            <div>
              <h2 className="text-base md:text-lg my-5 font-semibold">
                New Note
              </h2>
              {isLoading ? (
                <button className="smallButton">Loading..</button>
              ) : (
                <div className="flex justify-end">
                  <button className="smallButton">Save</button>
                </div>
              )}
            </div>
            {/* username */}
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
            {/* password */}
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

export default NewNoteForm;

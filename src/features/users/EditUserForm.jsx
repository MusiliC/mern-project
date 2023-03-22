import React, { useEffect, useState } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";

// const USER_REGEX = /^[A-Z]{3,20}$/;
// const PWD_REGEX = /^[A-Z0-9!@#$%]{4,12}$/;

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState(user.password);
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  // useEffect(() => {
  //   setValidUsername(USER_REGEX.test(username));
  // }, [username]);

  // useEffect(() => {
  //   setValidPassword(PWD_REGEX.test(password));
  // }, [password]);

  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess || isDelSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions, //HTML collection
      (option) => option.value
    );
    setRoles(values);
  };

  const onActiveChanged = () => setActive((prev) => !prev);

  const onSaveUser = async (e) => {
    e.preventDefault();
    if (password) {
      await updateUser({ id: user.id, username, password, roles, active });
    } else {
      await updateUser({ id: user.id, username, roles, active });
    }
    // if (canSave) {
    //   await addNewUser({ username, password, roles });
    // }
  };

  const onDeleteUser = async () => {
    await deleteUser({ id: user.id });
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option value={role} key={role}>
        {role}
      </option>
    );
  });

  // let canSave;

  // if (password) {
  //   canSave =
  //     [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;
  // } else {
  //   canSave = [roles.length, validUsername].every(Boolean) && !isLoading;
  // }

  const errContent = (error?.data?.message || delError?.data?.message) ?? "";

  return (
    <section>
      <div className="w-5/6 mx-auto min-h-[70vh] text-sm md:text-base">
        <div>
          {errContent ? (
            <p className="errClass md:w-3/4 lg:w-1/2 ">{errContent}</p>
          ) : null}
        </div>
        <div className=" md:w-3/4 lg:w-1/2">
          <form action="">
            <div>
              <h2 className="title">Edit User</h2>
              <div className="flex justify-between my-4">
                <button className="smallButton" onClick={onSaveUser}>
                  Save
                </button>
                <button className="deleteButton" onClick={onDeleteUser}>
                  Delete
                </button>
              </div>
            </div>
            {/* username */}
            <div>
              <label htmlFor="">Username:</label>
              <input
                type="text"
                id="username"
                className="inputStyles"
                name="username"
                value={username}
                onChange={onUsernameChanged}
              />
            </div>
            {/* password */}
            <div>
              <label htmlFor="">Password:</label>
              <input
                type="text"
                id="password"
                className="inputStyles"
                name="password"
                value={password}
                onChange={onPasswordChanged}
              />
            </div>
            {/* active check box */}
            <div className="flex items-center space-x-2 my-2">
              <label htmlFor="">Active:</label>
              <input
                type="checkbox"
                className="rounded h-5 w-5  "
                checked={active}
                onChange={onActiveChanged}
              />
            </div>
            {/* roles */}
            <div>
              <label htmlFor="">Assigned roles:</label>
              <select
                name="roles"
                className="inputStyles"
                id="roles"
                multiple={true}
                size="3"
                value={roles}
                onChange={onRolesChanged}
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

export default EditUserForm;

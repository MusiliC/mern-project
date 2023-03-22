import React, { useEffect, useState } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";

// const USER_REGEX = /^[A-Z]{3,20}$/;
// const PWD_REGEX = /^[A-Z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Employee"]);

  // useEffect(() => {
  //   setValidUsername(USER_REGEX.test(username));
  // }, [username]);

  // useEffect(() => {
  //   setValidPassword(PWD_REGEX.test(password));
  // }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions, //HTML collection
      (option) => option.value
    );
    setRoles(values);
  };

  // const canSave =
  //   [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

  const onSaveUser = async (e) => {
    e.preventDefault();
    await addNewUser({ username, password, roles });
    // if (canSave) {
    //   await addNewUser({ username, password, roles });
    // }
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option value={role} key={role}>
        {role}
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
          <form action="" onSubmit={onSaveUser}>
            <div>
              <h2 className="text-base md:text-lg my-5 font-semibold">
                New User
              </h2>
              <div className="flex justify-end">
                <button className="smallButton">Save</button>
              </div>
            </div>
            {/* username */}
            <div>
              <label htmlFor="">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                className="inputStyles"
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
            {/* roles */}
            <div>
              <label htmlFor="">Assigned roles:</label>
              <select
                name="roles"
                id="roles"
                multiple={true}
                className="inputStyles"
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

export default NewUserForm;

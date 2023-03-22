import React, { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./AuthApiSlice";

import usePersist from "../../hooks/usePersist.jsx";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [persist, setPersist] = usePersist()

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  

  const errClass = errMsg ? "errClass" : "offscreen";

  if (isLoading) {
    <p className="loading"> Loading...</p>;
  }

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist(prev =>!prev)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const content = (
    <section className="py-10  w-5/6 mx-auto  ">
      
      <div className="md:w-3/4 lg:w-1/2 mx-auto min-h-[70vh] text-sm md:text-base">
        <header>
          <p className="title text-center">Employee Login</p>
        </header>
        <main>
          <p ref={errRef} className={errClass} aria-live="assertive">
            {errMsg}
          </p>
          <form action="" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="">Username</label>
              <input
                type="text"
                id="username"
                className="inputStyles"
                ref={userRef}
                value={username}
                onChange={handleUserInput}
                required
              />
            </div>
            {/* password */}
            <div>
              <label htmlFor="">Password</label>
              <input
                type="text"
                id="password"
                className="inputStyles"
                value={password}
                onChange={handlePwdInput}
                required
              />
            </div>
            <div className="flex justify-center my-5">
              {isLoading ? (
                <button className="button">Loading...</button>
              ) : (
                <button className="button ">Sign In</button>
              )}
            </div>
            <label htmlFor="">
              <input type="checkbox" id="persist" onChange={handleToggle} checked={persist} /> Trust This Device
            </label>
          </form>
        </main>
      </div>
      <div className="w-5/6 mx-auto">
        <div className="h-[2px] rounded-full my-4 bg-black"></div>
        <footer className="text-primary-500 font-semibold">
          <Link to={"/"}>Back to Home</Link>
        </footer>
      </div>
    </section>
  );

  return content;
};

export default Login;

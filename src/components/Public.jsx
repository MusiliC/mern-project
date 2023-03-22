import { Link } from "react-router-dom";
import React from "react";

const Public = () => {
  return (
    <section className="w-full py-8 ">
      <div className="w-5/6 mx-auto min-h-[70vh]">
        <header className="text-xl font-semibold md:text-2xl ">
          Welcome to my{" "}
          <span className="text-primary-500 font-bold">
            Full Stack Mern Project
          </span>
        </header>
        <div className="h-[2px] rounded-full my-4 bg-black"></div>
        <main className="md:w-3/4 text-sm md:text-base">
          <p>
            The system has complete authentication using Node JS, mongo DB for
            database management and react in combination with Tailwind CSS for
            frontend and user interface.
          </p>
          <div className="my-3 italic font-semibold">
            <p>Kasarani, Nairobi</p>
            <p>musilibrian07@gmail.com</p>
            <p>+254768687334</p>
          </div>
          <p className="text-primary-500 text-base font-semibold">
            Owner: Musili Brian
          </p>
        </main>
      </div>
      <div className="w-5/6 mx-auto">
        <div className="h-[2px] rounded-full my-4 bg-black"></div>
        <footer className="text-primary-500 font-semibold">
          <Link to="/login">Employee Login</Link>
        </footer>
      </div>
    </section>
  );
};

export default Public;

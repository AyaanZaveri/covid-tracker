import React from "react";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

const Nav = ({ search, setSearch, handleSubmit }) => {
  return (
    <div className="bg-slate-50 flex md:justify-between justify-center flex-row items-center p-5 border-b">
      <div className="flex justify-start items-center">
        <FaCaretUp className="md:block hidden text-2xl text-emerald-500 mr-2" />
        <span className="md:block hidden text-4xl text-slate-800 font-bold">The Covid Tracker</span>
        <FaCaretDown className="md:block hidden text-2xl text-rose-500 ml-2" />
      </div>

      <div className="flex md:justify-end justify-center items-center">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Country"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="placeholder:text-slate-500 bg-slate-100 text-slate-800 p-2 w-72 border focus:border-slate-500 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring ring-slate-300 active:bg-slate-100 transition"
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
};

export default Nav;

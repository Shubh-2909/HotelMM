import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex gap-5 justify-between bg-gray-200 items-center px-5 shadow-md">
      <div>
        <h1 className="text-3xl font-bold font-serif">Hotel Management</h1>
      </div>

      <div className="flex gap-4">
        <Link
          to="/registration"
          className="px-5 py-5 text-gray-900 font-semibold hover:text-gray-600 transition-all duration-200 ease-in"
        >
          Create
        </Link>
        <Link
          to="/edit"
          className="px-5 py-5 text-gray-900 font-semibold hover:text-gray-600 transition-all duration-200 ease-in"
        >
          Edit
        </Link>
        <Link
          to="/view"
          className="px-5 py-5 text-gray-900 font-semibold hover:text-gray-600 transition-all duration-200 ease-in"
        >
          View
        </Link>
        <Link
          to="/delete"
          className="px-5 py-5 text-gray-900 font-semibold hover:text-gray-600 transition-all duration-200 ease-in"
        >
          Delete
        </Link>
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search..."
          className="px-2 py-1 outline-none rounded-md"
        />
        <button className="px-3 py-1 border-none bg-gray-700 hover:bg-gray-500 rounded-md text-white transition-all duration-300 ease-linear">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Navbar;

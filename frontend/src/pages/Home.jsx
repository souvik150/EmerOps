import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-row justify-between items-center">
      <h1 className="text-4xl font-bold">Emerops</h1>
      <div>
        <Link
          to="/signin"
          className="px-6 py-3 mr-16 text-white bg-blue-600 rounded-xl"
        >
          Signin
        </Link>
        <Link
          to="/signup"
          className="px-6 py-3 text-white bg-blue-600 rounded-xl"
        >
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Home;

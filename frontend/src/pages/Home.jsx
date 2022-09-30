import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1 className="pb-24">Emerops</h1>
      <p></p>
      <Link to="/signin" className="pr-20">
        Signin
      </Link>
      <Link to="/signup">Signup</Link>
    </div>
  );
};

export default Home;

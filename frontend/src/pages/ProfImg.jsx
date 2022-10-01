import { useState, useEffect, useLocation } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

const ProfImg = () => {
  const [name, setName] = useState("");
  let defaultForm = new FormData();
  const [url, setUrl] = useState();

  var x = window.location.href;
  var arr = x.split("/");

  const navigate = useNavigate();

  console.log(
    `https://devjams-production.up.railway.app/api/v1/users/${arr[4]}/prof`
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    for (var key of defaultForm.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    console.log(arr[4]);

    const response = await fetch(
      `https://devjams-production.up.railway.app/api/v1/users/${arr[4]}/prof`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: defaultForm,
      }
    );
    console.log(response);

    if (response.status === 200) {
      console.log("Successfully");
      navigate(`/dashboard/${arr[4]}`);
    } else {
      console.log("Error: " + response.status);
    }
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    defaultForm.append("repImg", event.target.files[0]);
  };

  return (
    <div>
      <div className="text-4xl py-10 font-semibold ">
        Please upload image to continue
      </div>
      <form
        className="form-account"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="pic-cha">
          <input
            type="file"
            accept="image/jpg"
            onChange={handleFileChange}
            id="repImg"
          />
        </div>
        <button
          to="/"
          className="mr-36 py-3 mt-8 bg-blue-700 px-6 text-white rounded-2xl"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfImg;

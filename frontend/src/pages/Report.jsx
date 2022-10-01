import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Report = () => {
  const [name, setName] = useState("");
  let defaultForm = new FormData();
  const [url, setUrl] = useState();

  const navigate = useNavigate();

  var x = window.location.href;
  var arr = x.split("/");

  const addReportHandler = () => {
    navigate(`/users/reports/${arr[4]}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    for (var key of defaultForm.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    console.log(arr[4]);

    const response = await fetch(
      `https://devjams-production.up.railway.app/api/v1/users/${arr[4]}/reports`,
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
    <div className="pt-10">
      <div className="flex flex-row justify-between">
        <p className="text-4xl">View All Reports</p>
      </div>
      <form
        className="form-account"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="heading-primary">Upload Image</div>

        <div className="pic-cha">
          <input
            type="file"
            accept="image/png"
            onChange={handleFileChange}
            id="repImg"
          />
        </div>

        <div className="heading-secondary-sm-2 mar-t">{name}</div>

        <button to="/" className="button mar-t">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Report;

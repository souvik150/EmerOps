import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createWorker } from "tesseract.js";

const Report = () => {
  const [userData, setUserData] = useState({});
  let defaultForm = new FormData();
  const [url, setUrl] = useState();
  const [ocr, setOcr] = useState("Recognizing...");

  const navigate = useNavigate();

  var x = window.location.href;
  var arr = x.split("/");

  const addReportHandler = () => {
    navigate(`/users/reports/${arr[4]}`);
  };

  // useEffect(() => {
  //   fetch(
  //     `https://devjams-production.up.railway.app/api/v1/users/${arr[4]}/reports`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then(({ data }) => {
  //       setUserData(data.reports);
  //     });
  // }, []);

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
    <div>
      <div className="pt-10">
        <div className="flex flex-row justify-between">
          <p className="text-4xl py-10 font-semibold pb-24">Upload Reports</p>
        </div>
        <form
          className="form-account"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className="pic-cha">
            <input
              type="file"
              accept="image/png"
              onChange={handleFileChange}
              id="repImg"
            />
          </div>

          <button
            to="/"
            className="mr-36 py-3 mt-8 bg-blue-700 px-6 text-white rounded-2xl"
          >
            Upload
          </button>
        </form>
      </div>
      <div className="pt-20">
        {/*<div className="flex flex-row justify-between">
          <p className="text-4xl py-10 font-semibold pb-24">View Reports</p>
  </div>*/}

        <p>{ocr}</p>
      </div>
    </div>
  );
};

export default Report;

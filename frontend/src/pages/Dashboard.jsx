import { useState, useEffect, useLocation } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import Webcam from "react-webcam";

const defaultFormFields = {
  repImg: "N/A",
  imgUrl: "N/A",
  name: "N/A",
  email: "N/A",
  phone: "N/A",
  age: "N/A",
  insuranceNo: "N/A",
  insuranceProvider: "N/A",
  address: "N/A",
  weight: "N/A",
  allergies: "N/A",
  bloodGrp: "N/A",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(defaultFormFields);
  const [img, setImg] = useState("");

  var x = window.location.href;
  var arr = x.split("/");

  useEffect(() => {
    fetch(`https://devjams-production.up.railway.app/api/v1/users/${arr[4]}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then(({ data }) => {
        setUserData(data);
      });
  }, []);

  const submitHandler = () => {
    localStorage.removeItem("token");
    console.log("submitHandler");
    navigate("/");
  };

  const scanHandler = () => {
    navigate(`/users/${arr[4]}/reports`);
  };

  const profileChangeHandler = () => {
    navigate("/updateProfile");
  };

  const clickHandler = () => {};

  const handleSubmit = async (event) => {
    // event.preventDefault();
    // console.log(arr[4]);
    // const response = await fetch(
    //   ``,
    //   {
    //     method: "POST",
    //     body: img,
    //   }
    // );
    // console.log(response);
    // if (response.status === 200) {
    //   console.log("Successfully");
    //   navigate(`/dashboard/${arr[4]}`);
    // } else {
    //   console.log("Error: " + response.status);
    // }
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    defaultForm.append("repImg", event.target.files[0]);
  };

  const videoConstraints = {
    width: 640,
    height: 360,
    facingMode: "user",
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row pb-20 justify-between align-middle w-[80vw]">
        <h1 className="text-6xl font-bold">Dashboard</h1>
        <button
          className="px-16 mx-16 py-3 my-3 bg-blue-600 rounded-xl text-white"
          onClick={submitHandler}
        >
          Logout
        </button>
      </div>
      {console.log(userData.role)}
      {userData.role === "doctor" ? (
        <div className="w-[80vw] items-start">
          <h1 className="text-3xl font-semibold text-left">
            Welcome {userData.name}. Please upload the patient's photo to get
            data
          </h1>

          <div className=" flex flex-col py-6 justify-between items-center">
            <div>
              <Webcam
                audio={false}
                height={360}
                screenshotFormat="image/jpeg"
                width={640}
                videoConstraints={videoConstraints}
              >
                {({ getScreenshot }) => (
                  <button
                    className="px-16 mx-16 py-3 my-3 bg-blue-600 rounded-xl text-white "
                    onClick={() => {
                      const imageSrc = getScreenshot();
                      setImg(imageSrc);
                      console.log(imageSrc);
                    }}
                  >
                    Capture photo
                  </button>
                )}
              </Webcam>
            </div>

            {img != "" ? <img src={img} width="640" height="360" /> : null}
            {img != "" ? (
              <button
                className="px-16 mx-16 py-3 my-3 bg-blue-600 rounded-xl text-white "
                onClick={clickHandler}
              >
                Send photo
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="w-[80vw]">
          <button
            className="mr-36 bg-blue-700 py-3 px-6 text-white rounded-2xl"
            onClick={scanHandler}
          >
            Prescriptions
          </button>
          <button
            className="mr-36 bg-blue-700 py-3 px-6 text-white rounded-2xl"
            onClick={profileChangeHandler}
          >
            Edit Profile
          </button>
          <button className="bg-blue-700 py-3 px-6 text-white rounded-2xl">
            Medicines
          </button>
        </div>
      )}

      {userData.role === "doctor" ? (
        <div></div>
      ) : (
        <div className="w-[30vw] flex flex-col space-y-3">
          <h1 className="text-3xl font-bold pt-20 pb-6">
            Your Medical Information
          </h1>
          <div className="bg-blue-300 py-3 px-6 rounded-lg flex flex-row justify-between">
            <p className="font-bold text-xl">Age</p>
            <p className="text-xl">{userData.age}</p>
          </div>
          <div className="bg-blue-300 py-3 px-6 rounded-lg flex flex-row justify-between">
            <p className="font-bold text-xl">Phone</p>
            <p className="text-xl">{userData.phone}</p>
          </div>
          <div className="bg-blue-300 py-3 px-6 rounded-lg flex flex-row justify-between">
            <p className="font-bold text-xl">Insurance Number</p>
            <p className="text-xl">{userData.insuranceNo}</p>
          </div>
          <div className="bg-blue-300 py-3 px-6 rounded-lg flex flex-row justify-between">
            <p className="font-bold text-xl">Insurance Provider</p>
            <p className="text-xl">{userData.insuranceProvider}</p>
          </div>
          <div className="bg-blue-300 py-3 px-6 rounded-lg flex flex-row justify-between">
            <p className="font-bold text-xl">Address</p>
            <p className="text-xl">{userData.address}</p>
          </div>
          <div className="bg-blue-300 py-3 px-6 rounded-lg flex flex-row justify-between">
            <p className="font-bold text-xl">Weight</p>
            <p className="text-xl">{userData.weight}</p>
          </div>
          <div className="bg-blue-300 py-3 px-6 rounded-lg flex flex-row justify-between">
            <p className="font-bold text-xl">Allergies</p>
            <p className="text-xl">{userData.allergies}</p>
          </div>
          <div className="bg-blue-300 py-3 px-6 rounded-lg flex flex-row justify-between pb-3">
            <p className="font-bold text-xl">Blood Group</p>
            <p className="text-xl">{userData.bloodGrp}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

import { useState, useEffect, useLocation } from "react";
import { useNavigate } from "react-router-dom";

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
        <div className="pt-20">
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
              Send Image
            </button>
          </form>
        </div>
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

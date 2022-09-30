import { useState, useEffect } from "react";

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
  disabilities: "N/A",
};

const Profile = () => {
  const [data, setData] = useState(defaultFormFields);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  });

  useEffect(() => {
    fetch(
      `devjams-production.up.railway.app/api/v1/users/632e51bac412c00634edd40e`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold">Your Health Profile</h1>
    </div>
  );
};

export default Profile;

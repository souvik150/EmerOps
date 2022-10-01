import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const defaultFormFields = {
  name: "",
  email: "",
  phone: "",
  age: "",
  password: "",
  passwordConfirm: "",
};

const SignupForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, email, phone, age, password, passwordConfirm } = formFields;
  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(formFields);

    const response = await fetch(
      `https://devjams-production.up.railway.app/api/v1/users/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formFields),
      }
    ).then((res) => res.json());

    if (response.status === "success") {
      localStorage.setItem("token", response.token);
      navigate(`/users/${response.data.user._id}/prof`);
    } else {
      console.log("Error: " + response.message);
    }

    resetFormFields();
  };

  return (
    <div>
      <div className="login">
        <form onSubmit={handleSubmit}>
          <div className="text-4xl font-bold text-left pt-20">
            Lets get you an Account
          </div>
          <div className="py-16 flex flex-col justify-between items-center w-[30vw]">
            <div className="py-3 flex flex-row justify-between items-center w-[30vw]">
              <label htmlFor="name">Enter Name</label>
              <input
                className="p-2 rounded-xl m-1 bg-white border border-black"
                name="name"
                type="text"
                required
                onChange={handleChange}
                value={name}
                placeholder="Name"
              />
            </div>
            <div className="py-3 flex flex-row justify-between items-center w-[30vw]">
              <label htmlFor="email">Enter E-Mail</label>
              <input
                className="p-2 rounded-xl m-1 bg-white border border-black"
                name="email"
                type="email"
                required
                onChange={handleChange}
                value={email}
                placeholder="Email"
              />
            </div>
            <div className="py-3 flex flex-row justify-between items-center w-[30vw]">
              <label htmlFor="phone">Phone Number</label>
              <input
                className="p-2 rounded-xl m-1 bg-white border border-black"
                name="phone"
                type="number"
                required
                onChange={handleChange}
                value={phone}
                placeholder="Phone Number"
              />
            </div>
            <div className="py-3 flex flex-row justify-between items-center w-[30vw]">
              <label htmlFor="age">Age</label>
              <input
                className="p-2 rounded-xl m-1 bg-white border border-black"
                name="age"
                type="number"
                required
                onChange={handleChange}
                value={age}
                placeholder="Age"
              />
            </div>

            <div className="py-3 flex flex-row justify-between items-center w-[30vw]">
              <label htmlFor="passwowrd">Password</label>
              <input
                name="password"
                className="p-2 rounded-xl m-1 bg-white border border-black"
                type="password"
                required
                onChange={handleChange}
                value={password}
                placeholder="Password"
                id="password"
              />
            </div>

            <div className="py-3 flex flex-row justify-between items-center w-[30vw]">
              <label htmlFor="passwordConfirm">Password Confirm</label>
              <input
                name="passwordConfirm"
                className="p-2 rounded-xl m-1 bg-white border border-black"
                type="password"
                required
                onChange={handleChange}
                value={passwordConfirm}
                placeholder="passwordConfirm"
                id="passwordConfirm"
              />
            </div>
            <button
              to="/"
              className="mr-36 py-3 mt-8 bg-blue-700 px-6 text-white rounded-2xl"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;

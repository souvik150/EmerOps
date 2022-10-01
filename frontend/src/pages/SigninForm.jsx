import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const defaultFormFields = {
  email: "",
  password: "",
};

const SigninForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const [buttonText, setbuttonText] = useState("Login");
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
      `https://devjams-production.up.railway.app/api/v1/users/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formFields),
      },
      setbuttonText("Logging in")
    ).then((res) => res.json());

    console.log(response);
    console.log(response.data.user._id);

    if (response.status === "success") {
      localStorage.setItem("token", response.token);
      navigate(`/dashboard/${response.data.user._id}`);
    } else {
      console.log("Error: " + response.message);
    }

    resetFormFields();
  };

  return (
    <div>
      <div className="login">
        <form onSubmit={handleSubmit} className="items-center">
          <div className="heading-primary">Login</div>
          <div className="text-4xl">Welcome back! See what you have missed</div>

          <div className="py-16 flex flex-row justify-between items-center w-[30vw]">
            <label htmlFor="email" className="pr-6">
              Enter your Mail
            </label>
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

          <div className="py-16 flex flex-row justify-between items-center w-[30vw]">
            <label htmlFor="password" className="pr-6">
              Password
            </label>
            <input
              className="p-2 rounded-xl m-1 bg-white border border-black"
              name="password"
              type="password"
              required
              onChange={handleChange}
              value={password}
              placeholder="Password"
              id="password"
            />
          </div>

          <button
            to="/"
            className="mr-36 py-3 mt-8 bg-blue-700 px-6 text-white rounded-2xl"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SigninForm;

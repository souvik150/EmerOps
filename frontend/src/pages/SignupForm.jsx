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
    console.log(response.status);

    if (response.status === "success") {
      localStorage.setItem("token", response.token);
      navigate("/profileImg");
    } else {
      console.log("Error: " + response.message);
    }

    resetFormFields();
  };

  return (
    <div>
      <div className="login">
        <form className="form-signin" onSubmit={handleSubmit}>
          <div className="heading-primary">Signup</div>
          <div className="heading-secondary">
            Welcome back! See what you have missed
          </div>

          <label htmlFor="name">Enter Name</label>
          <input
            name="name"
            type="text"
            required
            onChange={handleChange}
            value={name}
            placeholder="Name"
          />

          <label htmlFor="email">Enter E-Mail</label>
          <input
            name="email"
            type="email"
            required
            onChange={handleChange}
            value={email}
            placeholder="Email"
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            name="phone"
            type="number"
            required
            onChange={handleChange}
            value={phone}
            placeholder="Phone Number"
          />

          <label htmlFor="age">Age</label>
          <input
            name="age"
            type="number"
            required
            onChange={handleChange}
            value={age}
            placeholder="Age"
          />

          <label htmlFor="passwowrd">Password</label>
          <input
            name="password"
            type="password"
            required
            onChange={handleChange}
            value={password}
            placeholder="Password"
            id="password"
          />

          <label htmlFor="passwordConfirm">Password Confirm</label>
          <input
            name="passwordConfirm"
            type="password"
            required
            onChange={handleChange}
            value={passwordConfirm}
            placeholder="passwordConfirm"
            id="passwordConfirm"
          />

          <button to="/">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;

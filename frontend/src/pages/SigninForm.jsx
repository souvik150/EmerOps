import { useState } from "react";
import { Link } from "react-router-dom";

const defaultFormFields = {
  email: "",
  password: "",
};

const SigninForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

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
      }
    ).then((res) => res.json());
    console.log(response);

    // if (response.success) {
    //   localStorage.setItem("token", response.token);
    //   navigate("/dashboard");
    // } else {
    //   setError({
    //     message: "Invalid Credientials",
    //   });
    // }

    resetFormFields();
  };

  return (
    <div>
      <div className="login">
        <div className="login-background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <form className="form-signin" onSubmit={handleSubmit}>
          <div className="heading-primary">Login</div>
          <div className="heading-secondary">
            Welcome back! See what you have missed
          </div>

          <label htmlFor="email">Enter your Mail</label>
          <input
            name="email"
            type="email"
            required
            onChange={handleChange}
            value={email}
            placeholder="Email"
          />

          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            required
            onChange={handleChange}
            value={password}
            placeholder="Password"
            id="password"
          />
          <button to="/">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default SigninForm;

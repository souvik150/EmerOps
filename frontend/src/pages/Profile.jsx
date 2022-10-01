import { useState } from "react";
const defaultFormFields = {
  imgUrl: "",
  name: "",
  email: "",
  phone: "",
  age: "",
  insuranceNo: "",
  insuranceProvider: "",
  address: "",
  weight: "",
  allergies: "",
  disabilities: "",
};

const Profile = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {
    imgUrl,
    name,
    email,
    phone,
    age,
    insuranceNo,
    insuranceProvider,
    address,
    weight,
    allergies,
    disabilities,
  } = formFields;

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
      `https://devjams-production.up.railway.app/api/v1/users/updateMe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formFields),
      }
    ).then((res) => res.json());

    console.log(response);

    if (response.status === "success") {
      console.log("Successfully updated user");
    } else {
      console.log("Error: " + response.message);
    }

    resetFormFields();
  };

  return (
    <div>
      <h1 className="text-4xl font-semibold text-left">
        Update your profile Data
      </h1>
      <div>
        <form onSubmit={handleSubmit} className="items-center">
          <div className="flex flex-row space-x-32">
            <div>
              <div className="pt-16 pb-4 flex flex-row justify-between items-center w-[25vw]">
                <label htmlFor="email" className="pr-6">
                  Name
                </label>
                <input
                  className="p-2 rounded-xl m-1 bg-white border border-black"
                  name="name"
                  type="text"
                  onChange={handleChange}
                  value={name}
                  placeholder="Name"
                />
              </div>

              <div className="py-4 flex flex-row justify-between items-center w-[25vw]">
                <label htmlFor="password" className="pr-6">
                  Email
                </label>
                <input
                  className="p-2 rounded-xl m-1 bg-white border border-black"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  value={email}
                  placeholder="Email"
                  id="email"
                />
              </div>

              <div className="py-4 flex flex-row justify-between items-center w-[25vw]">
                <label htmlFor="Phone" className="pr-6">
                  Phone
                </label>
                <input
                  className="p-2 rounded-xl m-1 bg-white border border-black"
                  name="phone"
                  type="text"
                  onChange={handleChange}
                  value={phone}
                  placeholder="Phone"
                  id="phone"
                />
              </div>
              <div className="py-4 flex flex-row justify-between items-center w-[25vw]">
                <label htmlFor="Age" className="pr-6">
                  Age
                </label>
                <input
                  className="p-2 rounded-xl m-1 bg-white border border-black"
                  name="age"
                  type="text"
                  onChange={handleChange}
                  value={age}
                  placeholder="Age"
                  id="age"
                />
              </div>
              <div className="py-4 flex flex-row justify-between items-center w-[25vw]">
                <label htmlFor="password" className="pr-6">
                  Insurance No.
                </label>
                <input
                  className="p-2 rounded-xl m-1 bg-white border border-black"
                  name="insuranceNo"
                  type="insuranceNo"
                  onChange={handleChange}
                  value={insuranceNo}
                  placeholder="insuranceNo"
                  id="insuranceNo"
                />
              </div>
            </div>
            <div>
              <div className="py-4 lg:pt-16 flex flex-row justify-between items-center w-[25vw]">
                <label htmlFor="password" className="pr-6">
                  Insurance Provider
                </label>
                <input
                  className="p-2 rounded-xl m-1 bg-white border border-black"
                  name="insuranceProvider"
                  type="insuranceProvider"
                  onChange={handleChange}
                  value={insuranceProvider}
                  placeholder="insuranceProvider"
                  id="insuranceProvider"
                />
              </div>
              <div className="py-4 flex flex-row justify-between items-center w-[25vw]">
                <label htmlFor="password" className="pr-6">
                  Address
                </label>
                <input
                  className="p-2 rounded-xl m-1 bg-white border border-black"
                  name="address"
                  type="address"
                  onChange={handleChange}
                  value={address}
                  placeholder="address"
                  id="address"
                />
              </div>
              <div className="py-4 flex flex-row justify-between items-center w-[25vw]">
                <label htmlFor="password" className="pr-6">
                  Weight
                </label>
                <input
                  className="p-2 rounded-xl m-1 bg-white border border-black"
                  name="weight"
                  type="weight"
                  onChange={handleChange}
                  value={weight}
                  placeholder="Weight"
                  id="weight"
                />
              </div>
              <div className="py-4 flex flex-row justify-between items-center w-[25vw]">
                <label htmlFor="password" className="pr-6">
                  Allergies
                </label>
                <input
                  className="p-2 rounded-xl m-1 bg-white border border-black"
                  name="allergies"
                  type="allergies"
                  onChange={handleChange}
                  value={allergies}
                  placeholder="Allergies"
                  id="allergies"
                />
              </div>
              <div className="pt-4 flex flex-row justify-between items-center w-[25vw]">
                <label htmlFor="password" className="pr-6">
                  Disablities
                </label>
                <input
                  className="p-2 rounded-xl m-1 bg-white border border-black"
                  name="disabilities"
                  type="disabilities"
                  onChange={handleChange}
                  value={disabilities}
                  placeholder="Disabilities"
                  id="disabilities"
                />
              </div>
            </div>
          </div>
          <button
            to="/"
            className="mr-36 py-3 mt-8 bg-blue-700 px-6 text-white rounded-2xl"
          >
            Update data
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

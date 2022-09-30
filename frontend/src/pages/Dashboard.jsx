import React from "react";

const Dashboard = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-row pb-36">
        <h1 className="pr-36">Dashboard</h1>
        <button>Logout</button>
      </div>
      <div>
        <button className="mr-36">Scan Prescription</button>
        <button className="mr-36">View Prescription</button>
        <button className="mr-36">Appointments</button>
        <button>Medicines</button>
      </div>
    </div>
  );
};

export default Dashboard;

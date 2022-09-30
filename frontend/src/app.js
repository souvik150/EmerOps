import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import SignupForm from "./pages/SignupForm";
import SigninForm from "./pages/SigninForm";
import ProfImg from "./pages/ProfImg";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.key}>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SigninForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/users/:id/prof" element={<ProfImg />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;

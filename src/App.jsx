import { Route, Routes } from "react-router-dom";
import Business from "./components/Business";
import CTA from "./components/CTA";
import Hero from "./components/Hero";
import HowToUse from "./components/HowToUse";
import Navbar from "./components/Navbar";
import Stats from "./components/Stats";
import Prediction from "./components/Prediction";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Success from "./components/Success";

const HomePage = () => (
  // custom home page route
  <div className="bg-primary w-full overflow-hidden">
    <div className="flex items-center justify-center px-6 sm:px-16">
      <div className="w-full xl:max-w-[1280px]">
        <Navbar />
      </div>
    </div>
    <div className="bg-primary flex justify-center items-start">
      <div className="w-full xl:max-w-[1280px]">
        <Hero id="home" />
      </div>
    </div>
    <div className="bg-primary px-6 sm:px-16">
      <div className="w-full xl:max-w-[1280px]">
        <Stats />
        <div id="feature">
          <Business id="features" />
        </div>
        <HowToUse id="howtouse" />
        <CTA />
      </div>
    </div>
  </div>
);

const App = () => (
  <div className="bg-primary w-full">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/prediction"
        element={
          <div className="flex flex-col min-h-screen bg-gray-gradient">
            <Navbar />
            <Prediction />
          </div>
        }
      />
      {/* //signup route */}
      <Route
        path="/signup"
        element={
          <div className="flex flex-col min-h-screen bg-gray-gradient">
            <Navbar />
            <SignUp />
          </div>
        }
      />
      <Route
        path="/login"
        element={
          <div className="flex flex-col min-h-screen bg-gray-gradient">
            <Navbar />
            <Login />
          </div>
        }
      />
      {/* //success page route */}
      <Route
        path="/success"
        element={
          <div className="flex flex-col min-h-screen bg-gray-gradient">
            <Navbar />
            <Success />
          </div>
        }
      />
    </Routes>
  </div>
);

export default App;

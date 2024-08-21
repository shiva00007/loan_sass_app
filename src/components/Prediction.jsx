import UserForm from "./UserForm";
import { register } from "../assets";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Prediction = () => {
  const navigate = useNavigate();

  //  To check for JWT token in local storage on component mount
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");

    // If token doesn't exist, redirect user to the home page with an alert
    if (!jwtToken) {
      alert("Kindly login and continue");
      navigate("/");
    }
  }, [navigate]);

  return (
    <section className="flex flex-col md:flex-row h-screen max-h-screen bg-discount-gradient-2 text-white">
      {/* Main content section containing the user form */}
      <section className="relative flex-1 overflow-y-auto px-[5%]">
        <div className="mx-auto flex size-full max-w-[860px] flex-1 flex-col py-10">
          {/* Custom UserForm component */}
          <UserForm />
        </div>
      </section>
      {/* Side image displayed on larger screens */}
      <img
        src={register}
        alt="Register Illustration"
        className="hidden md:block md:max-w-[390px] md:relative md:top-0 md:right-0 md:w-full md:h-auto absolute inset-0 mx-auto object-cover"
      />
    </section>
  );
};

export default Prediction;

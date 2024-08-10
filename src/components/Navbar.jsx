import { useState } from "react";
import { close, logo, menu } from "../assets";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <img src={logo} alt="hoobank" className="w-[124px] h-[32px]" />

      {/* Desktop Navigation */}
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        <li className="font-poppins font-normal cursor-pointer text-[16px] text-white space-x-4">
          <Link to="/">Home</Link>
          <a href="/#feature">Features</a>
          <a href="/#howtouse">How To Use</a>
          <Link to="/prediction">Prediction</Link>
          <button className="py-2 px-4 bg-blue-gradient font-poppins font-medium text-[18px] text-primary outline-none rounded-lg">
            <Link to="/SignUp">Login</Link>
          </button>
        </li>
      </ul>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            <li
              className={`font-poppins font-medium cursor-pointer text-[16px] ${
                active === "Home" ? "text-white" : "text-dimWhite"
              } mb-4`}
              onClick={() => {
                setActive("Home");
                setToggle(false); // Close menu on item click
              }}
            >
              <Link to="/">Home</Link>
            </li>
            <li
              className={`font-poppins font-medium cursor-pointer text-[16px] ${
                active === "Features" ? "text-white" : "text-dimWhite"
              } mb-4`}
              onClick={() => {
                setActive("Features");
                setToggle(false); // Close menu on item click
              }}
            >
              <a href="/#feature">Features</a>
            </li>
            <li
              className={`font-poppins font-medium cursor-pointer text-[16px] ${
                active === "How To Use" ? "text-white" : "text-dimWhite"
              } mb-4`}
              onClick={() => {
                setActive("How To Use");
                setToggle(false); // Close menu on item click
              }}
            >
              <a href="/#howtouse">How To Use</a>
            </li>
            <li
              className={`font-poppins font-medium cursor-pointer text-[16px] ${
                active === "Prediction" ? "text-white" : "text-dimWhite"
              } mb-4`}
              onClick={() => {
                setActive("Prediction");
                setToggle(false); // Close menu on item click
              }}
            >
              <Link to="/prediction">Prediction</Link>
            </li>
            <li
              className={`font-poppins font-medium cursor-pointer text-[16px] ${
                active === "Login" ? "text-white" : "text-dimWhite"
              } mb-4`}
              onClick={() => {
                setActive("Login");
                setToggle(false); // Close menu on item click
              }}
            >
              <Link to="/SignUp">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

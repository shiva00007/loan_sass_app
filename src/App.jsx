// import Business from "./components/Business";
// import CTA from "./components/CTA";
// import Hero from "./components/Hero";
// import HowToUse from "./components/HowToUse";
// import Navbar from "./components/Navbar";
// import Stats from "./components/Stats";

// const App = () => {
//   return (
//     <div className="bg-primary w-full overflow-hidden">
//       <div className="flex items-center justify-center px-6 sm:px-16">
//         <div className="w-full xl:max-w-[1280px]">
//           <Navbar />
//         </div>
//       </div>
//       <div className="bg-primary flex justify-center items-start">
//         <div className="w-full xl:max-w-[1280px]">
//           <Hero />
//         </div>
//       </div>
//       <div className="bg-primary px-6 sm:px-16 flex justify-center items-center">
//         <div className="w-full xl:max-w-[1280px]">
//           <Stats />
//           <Business />
//           <HowToUse />
//           <CTA />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;

import { Route, Routes } from "react-router-dom";
import Business from "./components/Business";
import CTA from "./components/CTA";
import Hero from "./components/Hero";
import HowToUse from "./components/HowToUse";
import Navbar from "./components/Navbar";
import Stats from "./components/Stats";
import Prediction from "./components/Prediction";

const HomePage = () => (
  <div>
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
    <div className="bg-primary px-6 sm:px-16 flex justify-center items-center">
      <div className="w-full xl:max-w-[1280px]">
        <Stats />
        <Business id="features" />
        <HowToUse id="howtouse" />
        <CTA />
      </div>
    </div>
  </div>
);

const App = () => {
  return (
    <div className="bg-primary w-full">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/prediction"
          element={
            <div>
              <div className="flex items-center justify-center px-6 sm:px-16">
                <div className="w-full xl:max-w-[1280px]">
                  <Navbar />
                </div>
              </div>
              <Prediction />
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

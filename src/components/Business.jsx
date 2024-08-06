import Button from "./Button";
import { features } from "../constants";
import FeatureCard from "./FeatureCard";

const Business = ({ id }) => {
  return (
    <section id={id} className="flex md:flex-row flex-col py-6 sm:py-16">
      <div className="flex-1 flex justify-center items-start flex-col">
        <h2 className="font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full">
          You Do the Business,
          <br className="sm:block hidden" />
          We Handle the Money
        </h2>
        <p className="font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px] max-w-[480px] mt-5">
          With the Right Information about loan Prediction we can asses the
          Money Value
        </p>
        <Button style="mt-10" />
      </div>
      <div className="flex-1 flex justify-center items-center md:ml-10 ml-0 md:mt-0 mt-10 relative flex-col">
        {features.map((feature, index) => (
          <FeatureCard key={feature.id} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Business;

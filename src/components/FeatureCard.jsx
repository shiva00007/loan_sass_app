import { features } from "../constants";

const FeatureCard = ({ icon, title, content, index }) => {
  return (
    <div
      className={`flex flex-row p-6 rounded-[20px] ${
        //last dont want the margin bottom
        index !== features.length - 1 ? "mb-6" : "mb-0"
      } feature-card`}
    >
      {/* //to list the icon in the right side */}
      <div className="w-[64px] h-[64px] rounded-full flex justify-center items-center bg-dimBlue">
        <img src={icon} alt="star" className="w-[50%] h-[50%] object-contain" />
      </div>
      {/* // to render a title */}
      <div className="flex-1 flex flex-col ml-3">
        <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
          {title}
        </h4>
        {/* // to render a content */}
        <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
          {content}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;

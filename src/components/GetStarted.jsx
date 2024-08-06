
import { arrowUp } from "../assets";

const GetStarted = () => {
  return (
    <div className="flex justify-center items-center w-[140px] h-[140px] rounded-full bg-blue-gradient p-[2px] cursor-pointer">
      <div className="flex items-center justify-center flex-col w-[100%] h-[100%] bg-primary rounded-full">
        <div className="flex  justify-center items-start flex-row">
          <p className="font-poppins font-medium text-[18px]leading-[23px] ">
            <span className="text-gradient">Get</span>
          </p>
          <img
            src={arrowUp}
            alt="arrowUp"
            className="w-[23px] h-[23px] object-contain"
          />
          <p className="font-poppins font-medium text-[18px] leading-[23px]">
            <span className="text-gradient">Started</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;

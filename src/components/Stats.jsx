import { stats } from "../constants";

const Stats = () => {
  return (
    <section className="flex flex-wrap items-center justify-center sm:mb-20 mb-5">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="flex flex-col sm:flex-row justify-center items-center text-center m-4"
        >
          <h4 className="font-poppins font-semibold text-[30px] sm:text-[40px] leading-[43px] sm:leading-[53px] text-white">
            {stat.value}
          </h4>
          <p className="font-poppins font-normal text-[16px] sm:text-[20px] leading-[21px] sm:leading-[26px] text-gradient uppercase mt-2 sm:mt-0 sm:ml-4">
            {stat.title}
          </p>
        </div>
      ))}
    </section>
  );
};

export default Stats;

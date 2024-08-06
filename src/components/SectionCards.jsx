const SectionCards = ({ content, title }) => {
  return (
    <div className="flex justify-between flex-col px-10 py-12 rounded-[20px]  max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5 feedback-card">
      <div className="flex flex-row">
        <div className="flex flex-col ml-4">
          <h2 className="font-poppins font-bold text-[20px] leading-[24px] text-gradient">
            {title}
          </h2>
        </div>
      </div>
      <p className="font-poppins font-normal text-[18px] leading-[32.4px] my-10 text-white">
        {content}
      </p>
    </div>
  );
};

export default SectionCards;

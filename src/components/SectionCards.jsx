const SectionCards = ({ content, title }) => {
  return (
    <div className="flex flex-col px-10 py-12 rounded-[20px] max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5 feedback-card">
      <div className="flex flex-col items-center text-center">
        <h2 className="font-poppins font-bold text-[20px] leading-[24px] text-gradient mb-4">
          {title}
        </h2>
      </div>
      <p className="font-poppins font-normal text-[18px] leading-[32.4px] text-white text-center">
        {content}
      </p>
    </div>
  );
};

export default SectionCards;

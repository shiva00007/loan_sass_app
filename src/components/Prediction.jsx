import UserForm from "./UserForm";
import { register } from "../assets";

const Prediction = () => {
  return (
    <section className="flex flex-col md:flex-row h-screen max-h-screen bg-discount-gradient-2 text-white">
      <section className="relative flex-1 overflow-y-auto px-[5%]">
        <div className="mx-auto flex size-full max-w-[860px] flex-1 flex-col py-10">
          {/* //custom userfom component */}
          <UserForm />
        </div>
      </section>
      <img
        src={register}
        alt="image"
        className="hidden md:block md:max-w-[390px] md:relative md:top-0 md:right-0 md:w-full md:h-auto absolute inset-0 mx-auto object-cover"
      />
    </section>
  );
};

export default Prediction;

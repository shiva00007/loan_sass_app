import UserForm from "./UserForm";
import { register } from "../assets";

const Prediction = () => {
  return (
    <section className=" flex h-screen max-h-screen bg-primary text-white">
      <section className=" remove-scrollbar relative flex-1 overflow-y-auto px-[5%]">
        <div className="mx-auto flex size-full  max-w-[860px] flex-1 flex-col py-10">
          {/* <UserForm /> */}
          <UserForm />
        </div>
      </section>
      <img
        src={register}
        alt="image"
        height={1000}
        width={1000}
        className="side-img max-w-[390px]"
      />
    </section>
  );
};

export default Prediction;

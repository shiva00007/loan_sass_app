import {
  FaMailBulk,
  FaPallet,
  FaPhone,
  FaUser,
  FaMapMarkerAlt, // Example icon for address
  // Example icon for salary
  FaCalendarAlt,
  FaPiggyBank,
  FaHome,
  FaRupeeSign,
  FaBehanceSquare, // Example icon for date
} from "react-icons/fa";
import FormInput from "./FormInput";

const UserForm = () => {
  return (
    <div className="p-4 md:p-8 lg:p-12 ">
      <form className="space-y-8">
        <section className="space-y-4">
          <h1 className="text-2xl font-bold text-white">Welcome 👋🏻</h1>
          <p className="text-white">Let us know about yourself</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Personal Information</h2>

          {/* Personal Information Fields */}
          <FormInput
            id="name"
            name="name"
            type="text"
            label="Username"
            placeholder="Enter your Name"
            icon={<FaUser />}
            required
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormInput
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="Enter your Email"
              icon={<FaMailBulk />}
              required
            />
            <FormInput
              id="phone"
              name="phone"
              type="tel"
              label="Mobile Number"
              placeholder="Enter your phone number"
              icon={<FaPhone />}
            />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormInput
              id="company"
              name="company"
              type="text"
              label="Company Name"
              placeholder="Enter your Company Name"
              icon={<FaPallet />}
              required
            />
            <FormInput
              id="address"
              name="address"
              type="text"
              label="Address"
              placeholder="Enter Your Address"
              icon={<FaMapMarkerAlt />} // Example icon for address
            />
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Financial Information</h2>

          {/* Financial Information Fields */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormInput
              id="current-salary"
              name="currentSalary"
              type="number"
              label="Current Salary"
              placeholder="Enter your Current Salary"
              icon={<FaRupeeSign />}
              required
            />
            <FormInput
              id="previous-salary"
              name="previousSalary"
              type="number"
              label="Previous Salary"
              placeholder="Enter your Previous Salary"
              icon={<FaRupeeSign />} // Example icon for salary
            />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormInput
              id="grocery-expense"
              name="groceryExpense"
              type="number"
              label="Approximate Grocery Expense per Month"
              placeholder="Enter Grocery Expense"
              icon={<FaRupeeSign />}
            />
            <FormInput
              id="current-emis"
              name="currentEmis"
              type="number"
              label="Current EMIs"
              placeholder="Enter Current EMIs"
              icon={<FaRupeeSign />}
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Housing Information</h2>

          <FormInput
            id="owns-house"
            name="ownsHouse"
            type="text"
            label="Owns a House? (Yes/No)"
            placeholder="Yes/No"
            required
            icon={<FaHome />}
          />
          <FormInput
            id="rent-amount"
            name="rentAmount"
            type="number"
            label="If No, Rent Amount"
            placeholder="Enter Rent Amount"
            icon={<FaRupeeSign />}
          />
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Employment Information</h2>

          {/* Employment Information Fields */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormInput
              id="date-previous-hike"
              name="datePreviousHike"
              type="date"
              label="Date of Previous Salary Hike"
              icon={<FaCalendarAlt />} // Example icon for date
              required
            />
            <FormInput
              id="date-next-hike"
              name="dateNextHike"
              type="date"
              label="Estimated Date of Next Salary Hike"
              icon={<FaCalendarAlt />} // Example icon for date
            />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormInput
              id="bank-name"
              name="bankName"
              type="text"
              label="Name of Bank"
              placeholder="Enter Name of Bank"
              icon={<FaPiggyBank />}
            />
            <FormInput
              id="pan"
              name="pan"
              type="text"
              label="PAN Number"
              placeholder="Enter a PAN Number"
              icon={<FaBehanceSquare />}
            />
          </div>
        </section>

        <button
          type="submit"
          className="px-5 h-10 bg-green-400 text-white w-full rounded-lg mt-3 hover:bg-green-500 font-bold"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default UserForm;

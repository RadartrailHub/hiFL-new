import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "../../../redux/features/auth.slice";
import { register } from "../../../redux/features/volunteer.slice";
import InputField from "../InputField";

const SignUpModal = () => {
  const initialState = {
    User: "",
    Institution: "",
    Department: "",
    Program: "",
    MatricNo: "",
    Level: "",
    // ExpectedYearOfGrad: "",
    NextOfKinName: "",
    NextOfKinPhone: "",
    WhyJoinVolunteer: "",
  };
  const [userData, setUserData] = useState(initialState);
  const router = useRouter();

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.volunteer);

  const baseURL = process.env.BASE_URL;
  const { data } = useFetch(`${baseURL}/institutions`);
  const seasons = useFetch(`${baseURL}/settings?populate=*`)?.data?.data;
  const currentSeasonID = seasons?.[0]?.CurrentSeason._id;

  const handleChange = (e) => {
    const { type, name, value, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setUserData({ ...userData, [name]: val });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (seasons !== undefined) {
      const participation = { Season: currentSeasonID, ApprovalStatus: "PENDING", ReferenceCode: "" };
      const payload = { ...userData, Participations: [participation] };

      dispatch(register({ payload, toast, router }));
    }
  };

  useEffect(() => {
    if (isLoggedIn()) {
      setUserData({ ...userData, User: isLoggedIn().data.User._id });
    }
  }, []);

  return (
    <form className="px-2 lg:p-6" onSubmit={handleSubmit}>
      <div className="flex justify-end">
        <label
          htmlFor="signup-modal"
          className="absolute right-2 top-2 lg:right-5 lg:top-5 p-4 lg:hover:bg-[#f5f5f5] lg:hover:rounded-full  cursor-pointer modal-button">
          <img src="/close-accent.svg" alt="" className="w-[12px]" />
        </label>
      </div>
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 justify-between items-center mb-4">
        <div className="w-full">
          <label htmlFor="University" className="font-bold text-sm">
            University
          </label>
          <select
            name="Institution"
            value={userData.Institution}
            onChange={handleChange}
            required
            className={`w-full border text-sm border-[#F4F4F4] mt-1 py-3 px-4 outline-none rounded`}>
            <option value="">Select University</option>
            {data?.data.map(({ InstitutionName, _id }, i) => (
              <option value={_id} key={i}>
                {InstitutionName}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full">
          <InputField
            type="text"
            name="Department"
            onChange={handleChange}
            placeholder="Department"
            data={userData}
            required
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 justify-between items-center mb-4">
        <div className="w-full">
          <label htmlFor="Program" className="font-bold text-sm">
            Program
          </label>
          <select
            name="Program"
            value={userData.Program}
            onChange={handleChange}
            required
            className={`w-full border text-sm border-[#F4F4F4] mt-1 py-3 px-4 outline-none rounded`}>
            <option value="" disabled>
              Select Program
            </option>
            <option value="undergraduate">Undergraduate</option>
            <option value="postgraduate">Postgraduate</option>
          </select>
        </div>
        <div className="w-full">
          <InputField
            type="text"
            name="MatricNo"
            onChange={handleChange}
            placeholder="Matric No"
            data={userData}
            required
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 justify-between items-center">
        <div className="w-full md:w-1/2">
          <label htmlFor="Program" className="font-bold text-sm">
            Level
          </label>
          <select
            name="Level"
            value={userData.Level}
            onChange={handleChange}
            required
            className={`w-full border text-sm border-[#F4F4F4] mt-1 py-3 px-4 outline-none rounded`}>
            <option value="" disabled>
              Select Level
            </option>
            <option value="100">100 Level</option>
            <option value="200">200 Level</option>
            <option value="300">300 Level</option>
            <option value="400">400 Level</option>
            <option value="500">500 Level</option>
            <option value="Msc">Msc</option>
            <option value="PhD">PhD</option>
          </select>
        </div>
        {/* <div className="w-full">
          <InputField
            type="text"
            name="ExpectedYearOfGrad"
            onChange={handleChange}
            required
            placeholder="Expected Year of Graduation"
            data={userData}
          />
        </div> */}
      </div>

      <h2 className="text-secondary text-xl font-bold my-4">Next of Kin Information</h2>

      <div className="flex flex-col md:flex-row gap-6 md:gap-12 justify-between items-center mb-4">
        <div className="w-full">
          <InputField
            type="text"
            name="NextOfKinName"
            onChange={handleChange}
            required
            placeholder="Full Name"
            data={userData}
          />
        </div>
        <div className="w-full">
          <InputField
            type="tel"
            name="NextOfKinPhone"
            onChange={handleChange}
            required
            placeholder="Phone Number"
            data={userData}
          />
        </div>
      </div>

      <div className="w-full">
        <label htmlFor="Heardaboutus" className="font-bold text-sm">
          Why do you want to volunteer?
        </label>
        <textarea
          name="WhyJoinVolunteer"
          onChange={handleChange}
          placeholder="Please type your message"
          className="w-full border text-sm mt-1 py-3 px-4 outline-none rounded"
          data={userData}
          rows={2}
          required
        />
      </div>
      <button className={`${loading && "loading"} btn btn-wide btn-secondary text-white capitalize font-bold mt-6`}>
        {loading ? "" : "Apply"}
      </button>
    </form>
  );
};

export default SignUpModal;

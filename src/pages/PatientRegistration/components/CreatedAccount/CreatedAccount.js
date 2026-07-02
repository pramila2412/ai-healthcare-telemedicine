import React from "react";
import Logo from "@/assets/logo.png";
import SuccessIcon from "@/assets/patientRegistration/SuccessFull.svg";

const CreatedAccount = () => {
  return (
    <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-lg p-8">

        <div className="flex justify-center mb-8">
          <img src={Logo} alt="logo" className="h-10" />
        </div>

        <div className="text-center">

          <img
            src={SuccessIcon}
            alt=""
            className="mx-auto h-16 w-16"
          />

          <h2 className="mt-6 text-3xl font-bold">
            Account Created Successfully!
          </h2>

          <p className="mt-3 text-[#666]">
            Your patient account has been created successfully.
          </p>

        </div>

        {/* Unique ID */}

        <div className="mt-8">
          <label className="text-sm font-semibold">
            Unique ID
          </label>

          <div className="mt-2 border rounded-lg h-12 flex items-center">
            <div className="bg-[#096B58] text-white h-full px-4 flex items-center rounded-l-lg">
              PAT
            </div>

            <div className="flex-1 flex justify-center tracking-[8px]">
              7N6S93
            </div>
          </div>
        </div>

        {/* Buttons */}

        <div className="mt-10 grid grid-cols-2 gap-4">
          <button className="h-12 rounded-lg border">
            View Profile
          </button>

          <button className="h-12 rounded-lg bg-[#096B58] text-white">
            Go to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreatedAccount;
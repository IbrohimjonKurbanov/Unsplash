import { FaSearch, FaUser, FaKey } from "react-icons/fa";
import React from "react";
import { MdEmail } from "react-icons/md";

function FormInput({ type, placeholder, name }) {
  return (
    <label className="input input-primary input-bordered input-sm md:input-md flex w-full items-center gap-2">
      <input
        type={type}
        className="grow"
        placeholder={placeholder}
        name={name}
      />
      {placeholder == "Search photos and illustrations" && (
        <FaSearch className="h-4 w-4 opacity-70" />
      )}
      {placeholder == "Full Name" && <FaUser className="h-4 w-4 opacity-70" />}
      {placeholder == "Email" && <MdEmail className="h-4 w-4 opacity-70" />}
      {placeholder == "Password" && <FaKey className="h-4 w-4 opacity-70" />}
      {placeholder == "Confirm Password" && (
        <FaKey className="h-4 w-4 opacity-70" />
      )}
    </label>
  );
}

export default FormInput;

import { FaSearch } from "react-icons/fa";
import React from "react";

function FormInput({ type, placeholder, name }) {
  return (
    <label className="input input-bordered flex items-center gap-2 w-full input-sm md:input-md">
      <input
        type={type}
        className="grow"
        placeholder={placeholder}
        name={name}
      />
      <FaSearch className="h-4 w-4 opacity-70" />
    </label>
  );
}

export default FormInput;

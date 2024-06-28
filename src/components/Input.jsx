import React from "react";

function Input({ type, placeholder, onChange, value = "" }) {
  return (
    <div className="w-full">
      <input
        className="w-full p-2 border-none bg-zinc-500 rounded-md placeholder:text-zinc-300 text-orange-100"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;

import React from 'react';

const TextInput = ({ label, ...props }) => {
  return (
    <div className="flex flex-col mb-4 flex-grow">
      <label className="mb-2 font-medium font-sans text-sm xl:text-lg text-black" htmlFor={props.id || props.name}>
        {label}
      </label>
      <input
        className="border-2 py-1.5 xl:py-2 px-3 text-black rounded-md bg-transparent text-sm xl:text-lg"
        {...props}
      />
    </div>
  );
};

export default TextInput;
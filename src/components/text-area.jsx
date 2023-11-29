import React from 'react';

const TextArea = ({ label, ...props }) => {
  return (
    <div className="flex flex-col mb-4 flex-grow">
      <label className="mb-2 font-medium font-sans text-lg text-black" htmlFor={props.id || props.name}>
        {label}
      </label>
      <textarea
        className="border-2 py-2 px-3 text-black rounded-md bg-transparent"
        {...props}
      />
    </div>
  );
};

export default TextArea;
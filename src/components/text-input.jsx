import React from 'react';

const TextInput = ({ label, error, ...props }) => {
  return (
    <div className="flex flex-col mb-4 flex-grow min-w-[200px]">
      <label className={`mb-2 font-medium font-sans text-sm xl:text-md ${error? 'text-rose': 'text-black'}`} htmlFor={props.id || props.name}>
        {label}
      </label>
      <input
        className={`border-2 ${error? 'border-rose': 'border-gray'} py-1.5 xl:py-2 px-3 text-black rounded-md bg-transparent text-sm xl:text-md`}
        {...props}
      />
      {error &&
        <p className='text-sm font-sans text-rose mt-2'>Required</p>
      }
    </div>
  );
};

export default TextInput;
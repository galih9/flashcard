import React from "react";

const Input = ({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}) => {
  return (
    <input
      className="border text-black dark:text-white border-gray-300 dark:border-gray-700 rounded-md p-2 w-full"
      value={value}
      onChange={onChange}
      onKeyDown={(e) => {
        if (e.code === "Enter") {
          onSubmit();
        }
      }}
    />
  );
};

export default Input;

import React from 'react';

const Input = ({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <input
      className="border border-gray-300 dark:border-gray-700 rounded-md p-2 w-full"
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;

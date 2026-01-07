import React from 'react';

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
      {children}
    </div>
  );
};

export default Card;

import React from 'react';

const MenuButton = () => {
  return (
    <div
      className="ml-2 inline-block rounded bg-softRed py-1 px-6 text-veryDarkGray xl:hidden"
      aria-label="Open menu"
    >
      <label htmlFor="menu" className="mb-0 flex cursor-pointer items-center">
        <i className="fas fa-bars text-lg"></i>
      </label>
    </div>
  );
};

export default MenuButton;

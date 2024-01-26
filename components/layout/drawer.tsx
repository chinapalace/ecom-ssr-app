'use client';

import { ReactNode, useState } from 'react';

export default function Drawer({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        className="fixed bottom-0 right-0 m-4 rounded bg-blue-500 p-2 text-white"
        onClick={toggleDrawer}
      >
        {isOpen ? 'Close' : 'Open'} Drawer
      </button>

      <div
        className={`fixed bottom-0 left-0 w-full transform bg-white p-4 transition-transform ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ zIndex: 1000 }}
      >
        {children}
      </div>
    </div>
  );
}

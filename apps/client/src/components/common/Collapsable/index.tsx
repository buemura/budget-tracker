import { useState } from 'react';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';

interface CollapsableProps {
  title: string;
  children: React.ReactNode;
}

export function Collapsable({ title, children }: CollapsableProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleChangeCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="flex flex-col justify-center bg-white m-2 p-4 shadow-sm md:mx-28 lg:mx-64">
      <div className="flex justify-between items-center">
        <span className="flex items-center gap-2 text-lg font-semibold tracking-wider">
          {title}
        </span>

        {isCollapsed ? (
          <SlArrowUp
            className="cursor-pointer"
            onClick={handleChangeCollapse}
          />
        ) : (
          <SlArrowDown
            className="cursor-pointer"
            onClick={handleChangeCollapse}
          />
        )}
      </div>

      {isCollapsed && <>{children}</>}
    </div>
  );
}

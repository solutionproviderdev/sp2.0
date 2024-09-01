import React from 'react';
import { Outlet } from 'react-router-dom';

const OperatorLayout: React.FC = () => {
  return (
    <div className="operator-layout">
      {/* Operator navigation */}
      <Outlet />
    </div>
  );
};

export default OperatorLayout;

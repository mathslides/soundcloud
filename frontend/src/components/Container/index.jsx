import React from "react";

const Container = ({ children }) => {
  return (
    <div className="gap-y-8 grid pr-6" style={{ marginBottom: 100 }}>
      {children}
    </div>
  );
};

export default Container;

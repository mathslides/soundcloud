import React from "react";
import Views from "../../views";

const ClassicLayout = (props) => {
  return (
    <div className="app-layout-classic flex flex-auto flex-col">
      <div className="flex flex-auto min-w-0">
        <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
          <div className="h-full flex flex-auto flex-col">
            <Views {...props} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassicLayout;

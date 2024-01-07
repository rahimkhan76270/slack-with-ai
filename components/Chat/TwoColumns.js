// components/TwoColumnLayout.js

import React from 'react';

const TwoColumnLayout = ({ children }) => {
  return (
    <div className="flex flex-wrap-reverse max-h-screen w-full relative">
      <div className="w-1/4 p-4 border-r-2 h-full border-black overflow-y-auto max-h-screen ">{children[0]}</div>
      <div className="w-3/4 p-4  overflow-y-auto max-h-screen absolute top-0 right-0">{children[1]}</div>
    </div>
  );
};

export default TwoColumnLayout;
import React, { useState } from 'react';

const TabGroup = ({ defaultTab, tabs }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const changeTab = (tab) => {
    setActiveTab(tab);
  };
//   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-2"

  return (
    <div>
      <div className="tab-buttons flex justify-between items-end m-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => changeTab(tab.id)}
            className={tab.id === activeTab ? 'active' : ''}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabs.map((tab) => (
          <div key={tab.id} className={tab.id === activeTab ? 'active' : 'hidden'}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabGroup;

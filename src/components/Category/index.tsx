"use client";
import React, { useState } from "react";

const Category: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("All");
  const tabs = ["All", "Running", "Training", "Lifestyle"];
  const selectedTab = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <div className="flex items-center space-x-4 mt-[32px] mb-[16px] h-[48px]">
      <ul className="flex items-center space-x-8">
        {tabs.map((tab) => (
          <li
            key={tab}
            onClick={() => selectedTab(tab)}
            className={`pb-2 text-[16px] font-medium transition ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
            // className="text-[16px] font-medium text-gray-700"
          >
            {tab}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;

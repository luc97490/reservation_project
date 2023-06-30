"use client";

import Navbar from "./mainnav/Navbar";
import SideBar from "./mainnav/Sidebar";
import { useState } from "react";
export default function ButtonSidebar({ children }) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [mlButton, setmlButton] = useState("left-273");
  const [mlContent, setmlContent] = useState("ml-288");
  const handleButtonClick = () => {
    setIsButtonClicked(!isButtonClicked);
    isButtonClicked ? setmlButton("left-273") : setmlButton("left-20");
    isButtonClicked ? setmlContent("ml-288") : setmlContent("ml-24");
  };
  return (
    <div>
      <button
        className={`box-border rounded-lg  border border-border-light dark:border-border-dark bg-primary-light dark:bg-primary-dark 
  flex flex-row items-start p-1.5 gap-8 absolute w-7 h-7 z-50 ${mlButton} top-12`}
        onClick={handleButtonClick}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.80475 5.13807C6.0651 4.87772 6.0651 4.45561 5.80475 4.19526C5.5444 3.93491 5.12229 3.93491 4.86194 4.19526L1.52861 7.5286C1.26826 7.78894 1.26826 8.21106 1.52861 8.4714L4.86194 11.8047C5.12229 12.0651 5.5444 12.0651 5.80475 11.8047C6.0651 11.5444 6.0651 11.1223 5.80475 10.8619L2.94282 8L5.80475 5.13807Z"
            fill="#5C5E64"
          />
          <path
            d="M11.1381 4.19526C10.8777 3.93491 10.4556 3.93491 10.1953 4.19526C9.93492 4.45561 9.93492 4.87772 10.1953 5.13807L13.0572 8L10.1953 10.8619C9.93492 11.1223 9.93492 11.5444 10.1953 11.8047C10.4556 12.0651 10.8777 12.0651 11.1381 11.8047L14.4714 8.4714C14.7318 8.21106 14.7318 7.78894 14.4714 7.5286L11.1381 4.19526Z"
            fill="#5C5E64"
          />
        </svg>
      </button>
      <Navbar isButtonClicked={isButtonClicked} />
      <SideBar isButtonClicked={isButtonClicked} />
      <div className="scroll-container">
        <div className={`content pt-20  ${mlContent}`}>{children}</div>
      </div>
    </div>
  );
}

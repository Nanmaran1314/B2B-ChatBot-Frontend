import React, { useState, useCallback, useEffect } from "react";
import logo from "../assets/images/Logo.jpeg";
import chatbot from "../assets/images/Chatbot.jpeg";
import { FaArrowDown, FaRedo } from "react-icons/fa";
import ChatInterface from "./ChatInterface";

const ToggleBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatKey, setChatKey] = useState(Date.now()); // Unique key for re-rendering
  const [showToast, setShowToast] = useState(false);

  const toggleBox = () => {
    setIsOpen(!isOpen);
  };

  const reloadChatInterface = useCallback(() => {
    setChatKey(Date.now()); // Change the key to force re-render
    setShowToast(true); // Show toast message
    setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
  }, []);

  useEffect(() => {
    setShowToast(true); // Show toast when component mounts
    setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
  }, []);

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end">
      {/* Toast Message */}
      {showToast && (
        <div className="relative">
          <div className="absolute bottom-1 right-0 mb-4 p-2 bg-white text-black rounded-lg shadow-lg flex items-center whitespace-nowrap">
            <span>Hi! Welcome to the world of B2B Hub India!.... What can I help you with?</span>
            <div className="absolute top-full right-4 w-0 h-0 border-x-[10px] border-x-transparent border-t-[10px] border-t-white"></div>
          </div>
        </div>
      )}

      {/* Toggle Box */}
      <div
        className={`absolute bottom-16 right-0 w-[34vw] h-[80vh] bg-gray-100 rounded-lg shadow-lg transition-all duration-300 ease-in-out flex flex-col ${isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-full invisible"
          }`}
      >
        {/* Title Bar */}
        <div className="bg-gradient-to-b from-red-400 via-red-500 to-red-600 text-white p-3 rounded-t-lg flex items-center">
          <img src={logo} alt="Logo" className="w-12 h-12 mr-2 rounded-full" />
          <h2 className="text-lg flex-grow">B2BHub India</h2>
          <button
            onClick={reloadChatInterface}
            className="text-white bg-red-700 hover:bg-red-800 p-2 rounded-full ml-2"
          >
            <FaRedo />
          </button>
        </div>

        {/* Chatbox Content */}
        <div className="p-4 bg-white flex-grow rounded-b-lg">
          <ChatInterface key={chatKey} /> {/* Pass the key to force re-render */}
        </div>
      </div>

      {/* Toggle Icon */}
      <div
        onClick={toggleBox}
      >
        {isOpen ? <FaArrowDown className="w-12 h-12 p-3 bg-gradient-to-b from-red-400 via-red-500 to-red-600 text-white flex items-center justify-center rounded-full text-md cursor-pointer mb-2 transition-transform duration-300 hover:scale-110"
        /> :
          <img src={chatbot} alt="Logo" className="w-20 h-20 bg-red-500 text-white flex items-center justify-center rounded-full text-2xl cursor-pointer mb-2 transition-transform duration-300 hover:scale-110"
          />
        } {/* Conditional rendering of arrows */}
      </div>
    </div>
  );
};

export default ToggleBox;

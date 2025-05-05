import React, { useState, useEffect } from "react";
import {
  FaTimes,
  FaInfoCircle,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";

const Alert = ({
  type = "info",
  message,
  onClose,
  autoClose = false,
  showIcon = true,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) setTimeout(onClose, 300);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) setTimeout(onClose, 300);
  };

  if (!isVisible) return null;

  const alertClasses = {
    success: "bg-green-50 text-green-800 border border-green-200",
    error: "bg-red-50 text-red-800 border border-red-200",
    warning: "bg-amber-50 text-amber-800 border border-amber-200",
    info: "bg-blue-50 text-blue-800 border border-blue-200",
  };

  const iconMap = {
    success: <FaCheckCircle size={20} className="text-green-500" />,
    error: <FaExclamationCircle size={20} className="text-red-500" />,
    warning: <FaExclamationCircle size={20} className="text-amber-500" />,
    info: <FaInfoCircle size={20} className="text-blue-500" />,
  };

  return (
    <div
      className={`${
        alertClasses[type]
      } p-4 rounded-md flex items-start justify-between transition-opacity duration-300 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex items-center">
        {showIcon && <span className="mr-3">{iconMap[type]}</span>}
        <div className="flex-1">{message}</div>
      </div>
      <button
        onClick={handleClose}
        className="ml-4 p-1 rounded-full hover:bg-gray-200 transition-colors"
      >
        <FaTimes size={16} />
      </button>
    </div>
  );
};

export default Alert;

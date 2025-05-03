// src/components/Chat/Message.jsx
import React from "react";

const Message = ({ sender, content, timestamp }) => {
  return (
    <div className="mb-4">
      <span className="font-bold mr-2">{sender}:</span>
      <span>{content}</span>
      <div className="text-xs text-gray-500 mt-1">{timestamp}</div>
    </div>
  );
};

export default Message;

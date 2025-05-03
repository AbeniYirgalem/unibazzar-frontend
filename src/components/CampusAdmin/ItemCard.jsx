import React, { useState } from "react";

export default function ItemCard({ item, onApprove, onReject }) {
  const [showReason, setShowReason] = useState(false);
  const [reason, setReason] = useState("");

  const handleReject = () => {
    if (reason.trim() === "")
      return alert("Please enter a reason for rejection.");
    onReject(item.id, reason);
    setShowReason(false);
    setReason("");
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-xl shadow space-y-3">
      <div className="flex gap-4">
        <img
          src={item.image}
          alt={item.title}
          className="w-24 h-24 object-cover rounded-md"
        />
        <div>
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-sm text-gray-300">{item.category}</p>
          <p className="text-sm mt-2 text-gray-400">{item.description}</p>
        </div>
      </div>

      {showReason && (
        <textarea
          placeholder="Reason for rejection..."
          className="w-full bg-white text-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      )}

      <div className="flex gap-3 justify-end">
        {!showReason ? (
          <button
            onClick={() => setShowReason(true)}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
          >
            Reject
          </button>
        ) : (
          <button
            onClick={handleReject}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
          >
            Submit Rejection
          </button>
        )}
        <button
          onClick={() => onApprove(item.id)}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md"
        >
          Approve
        </button>
      </div>
    </div>
  );
}

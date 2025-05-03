import React from 'react';

export default function FilterBar() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
      <input
        type="text"
        placeholder="Search by title or student"
        className="w-full sm:w-1/2 px-4 py-2 border rounded-md focus:outline-none"
      />
      <select className="px-4 py-2 border rounded-md">
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>
  );
}
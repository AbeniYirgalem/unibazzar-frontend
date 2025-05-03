import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, Check } from 'lucide-react';

const initialBookings = [
  {
    id: 1,
    student: 'Sara Meles',
    subject: 'Math',
    date: '2025-05-04',
    time: '10:00 AM',
    status: 'Pending',
  },
  {
    id: 2,
    student: 'Jonas Alemu',
    subject: 'Python Programming',
    date: '2025-05-05',
    time: '2:00 PM',
    status: 'Confirmed',
  },
];

export default function Bookings() {
  const [bookings, setBookings] = useState(initialBookings);

  const updateStatus = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: newStatus } : booking
      )
    );
  };

  const getStatusBadge = (status) => {
    const baseClass = "px-2 py-1 rounded-full text-xs font-semibold";
    switch (status) {
      case 'Pending':
        return <span className={`${baseClass} bg-yellow-500 text-black`}>{status}</span>;
      case 'Confirmed':
        return <span className={`${baseClass} bg-blue-600`}>{status}</span>;
      case 'Completed':
        return <span className={`${baseClass} bg-green-600`}>{status}</span>;
      case 'Cancelled':
        return <span className={`${baseClass} bg-red-500`}>{status}</span>;
      default:
        return status;
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

      <div className="overflow-x-auto bg-gray-800 p-4 rounded-xl shadow">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="py-2">Student</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b border-gray-700">
                <td className="py-2">{booking.student}</td>
                <td>{booking.subject}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{getStatusBadge(booking.status)}</td>
                <td className="space-x-2">
                  {booking.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => updateStatus(booking.id, 'Confirmed')}
                        className="text-green-400 hover:text-green-300"
                        title="Accept"
                      >
                        <CheckCircle size={18} />
                      </button>
                      <button
                        onClick={() => updateStatus(booking.id, 'Cancelled')}
                        className="text-red-400 hover:text-red-300"
                        title="Reject"
                      >
                        <XCircle size={18} />
                      </button>
                    </>
                  )}
                  {booking.status === 'Confirmed' && (
                    <button
                      onClick={() => updateStatus(booking.id, 'Completed')}
                      className="text-blue-400 hover:text-blue-300"
                      title="Mark as Completed"
                    >
                      <Check size={18} />
                    </button>
                  )}
                  {booking.status === 'Completed' && (
                    <Clock size={18} className="text-gray-500" title="Session done" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

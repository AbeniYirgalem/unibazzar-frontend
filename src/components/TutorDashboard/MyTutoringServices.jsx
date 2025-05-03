import React, { useState } from "react";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import ServiceModal from "./ServiceModal"; // Ensure the path is correct

const initialServices = [
  {
    id: 1,
    subject: "Mathematics",
    description: "Algebra, Calculus, Geometry for university level.",
    rate: "$20/hr",
    status: "Active",
  },
  {
    id: 2,
    subject: "Python Programming",
    description: "Beginner to intermediate Python with projects.",
    rate: "$25/hr",
    status: "Paused",
  },
];

export default function MyTutoringServices() {
  const [services, setServices] = useState(initialServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const handleAdd = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleSave = (serviceData) => {
    if (editingService) {
      // Update
      setServices((prev) =>
        prev.map((s) =>
          s.id === editingService.id ? { ...serviceData, id: s.id } : s
        )
      );
      toast.success("Service updated successfully!");
    } else {
      // Add
      const newService = {
        ...serviceData,
        id: Date.now(),
      };
      setServices((prev) => [...prev, newService]);
      toast.success("Service added successfully!");
    }
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this service?")) {
      setServices((prev) => prev.filter((s) => s.id !== id));
      toast.success("Service deleted.");
    }
  };

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Tutoring Services</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          <PlusCircle size={18} />
          Add Service
        </button>
      </div>

      <div className="overflow-x-auto bg-gray-800 p-4 rounded-xl shadow">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="py-2">Subject</th>
              <th>Description</th>
              <th>Rate</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-b border-gray-700">
                <td className="py-2">{service.subject}</td>
                <td>{service.description}</td>
                <td>{service.rate}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      service.status === "Active"
                        ? "bg-green-600 text-white"
                        : "bg-yellow-500 text-black"
                    }`}
                  >
                    {service.status}
                  </span>
                </td>
                <td className="space-x-2">
                  <button
                    className="text-blue-400 hover:text-blue-300"
                    onClick={() => handleEdit(service)}
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => handleDelete(service.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editingService={editingService}
      />
    </div>
  );
}

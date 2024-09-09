import React, { useState, useEffect, useRef } from "react";
import Notify from "../../utils/Notify";
import { createTea, updateTea } from "../../services/TeasService";
import { TeaType } from "../../Types/types";
import Spinner from "../helpers/Spinner";

interface Props {
  tea?: TeaType | null;
  onSuccess: (tea: TeaType) => void;
  onClose: () => void;
}

const CreateUpdateTeaComponent: React.FC<Props> = ({
  tea,
  onSuccess,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null); // Ref for the modal container

  const [formData, setFormData] = useState<TeaType>({
    id: tea?.id || "",
    name: tea?.name || "",
    description: tea?.description || "",
    price_per_unit: tea?.price_per_unit || 0,
    quantity: tea?.quantity || 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    // Handle different input types
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updatedTea: TeaType = {
      ...formData,
      price_per_unit: Number(formData.price_per_unit),
      quantity: Number(formData.quantity),
    };

    try {
      if (tea?.id) {
        await updateTea(tea.id, formData);
        Notify.success("Tea updated successfully!");
        onSuccess(updatedTea);
      } else {
        const newTew = await createTea(formData);
        Notify.success("Tea created successfully!");
        onSuccess(newTew);
      }
    } catch (error: any) {
      error?.errors
        ? Notify.error(error.errors[0].msg)
        : Notify.error(error.error || "An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="bg-white p-8 rounded shadow-lg max-w-md w-full"
      >
        <h2 className="text-xl font-bold mb-4">
          {tea ? "Update Tea" : "Create Tea"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded h-24 resize-none overflow-auto"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Price per Unit
            </label>
            <input
              type="number"
              name="price_per_unit"
              value={formData.price_per_unit}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-darkGreen text-white px-4 py-2 rounded hover:bg-[#61783a]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Spinner color="#F7F4E3" loading={isSubmitting} />
              ) : tea ? (
                "Update Tea"
              ) : (
                "Create Tea"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUpdateTeaComponent;

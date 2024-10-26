import { create_new_bug_report } from "@/app/lib/appwrite_functions/bug functions/bug_functions";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

import { UploadButton } from "@uploadthing/react";


export const CreateBugReportForm = ({ onSubmit }) => {
  const [bugTitle, setBugTitle] = useState('');
  const [bugDescription, setBugDescription] = useState('');
  const [bugSensitivity, setBugSensitivity] = useState(false);
  const [reportee_email, setReporteeEmail] = useState('');
  const [images, setImages] = useState(['']); // Array for image URLs
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    create_new_bug_report(bugTitle, bugDescription, bugSensitivity, reportee_email, images);
    
    const bugData = {
      bug_title: bugTitle,
      bug_description: bugDescription,
      bug_sensitivity: bugSensitivity,
      reportee_email: reportee_email,
      images: images
      
    };

    console.log("Bug Report Data:", bugData);
    setIsDialogOpen(false);
    if (onSubmit) onSubmit(bugData); // Call the onSubmit function if provided
  };

  // Handle changes for images input
  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  // Add new image input field
  const addImageField = () => setImages([...images, '']);

  return (
    <Dialog open={isDialogOpen} onOpenChange={(value) => setIsDialogOpen(value)}>
      <DialogTrigger className="p-1 border-2 border-black-500 rounded-md">
        Add Bug Report
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Bug Report</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="p-4 bg-black-100 rounded-md">

          {/* Bug Title */}
          <div className="mb-4">
            <label className="block mb-1">Bug Title:</label>
            <input
              type="text"
              value={bugTitle}
              onChange={(e) => setBugTitle(e.target.value)}
              className="border rounded p-2 w-full text-blue-500"
              required
            />
          </div>

          {/* Bug Description */}
          <div className="mb-4">
            <label className="block mb-1">Bug Description:</label>
            <textarea
              value={bugDescription}
              onChange={(e) => setBugDescription(e.target.value)}
              className="border rounded p-2 w-full text-blue-500"
              required
            />
          </div>

          {/* Bug Sensitivity */}
          <div className="mb-4">
            <label className="block mb-1">Bug Sensitivity:</label>
            <input
              type="checkbox"
              checked={bugSensitivity}
              onChange={(e) => setBugSensitivity(e.target.checked)}
              className="mr-2"
            />
            <span className="text-blue-500">Sensitive</span>
          </div>

          {/* Reportee Email */}
          <div className="mb-4">
            <label className="block mb-1">Reportee Email:</label>
            <input
              type="email"
              value={reportee_email}
              onChange={(e) => setReporteeEmail(e.target.value)}
              className="border rounded p-2 w-full text-blue-500"
              required
            />
          </div>

          {/* Images */}
          <h3 className="font-semibold text-blue-500">Images (URLs):</h3>
          {images.map((image, index) => (
            <div key={index} className="mb-2 flex text-blue-500">
              <input
                type="url"
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                className="border rounded p-2 w-full"
                placeholder="Image URL"
              />
              {index === images.length - 1 && ( // Show button only for the last input
                <button type="button" onClick={addImageField} className="ml-2 text-blue-500 ">
                  + Add Image
                </button>
              )}
            </div>
          ))}

          {/* Submit Button */}
          <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
            Submit Bug Report
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

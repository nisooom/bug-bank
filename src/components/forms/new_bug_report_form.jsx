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
  const [bugTitle, setBugTitle] = useState("");
  const [bugDescription, setBugDescription] = useState("");
  const [bugSensitivity, setBugSensitivity] = useState(false);
  const [reportee_email, setReporteeEmail] = useState("");
  const [images, setImages] = useState([""]); // Array for image URLs
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    create_new_bug_report(
      bugTitle,
      bugDescription,
      bugSensitivity,
      reportee_email,
      images,
    );

    const bugData = {
      bug_title: bugTitle,
      bug_description: bugDescription,
      bug_sensitivity: bugSensitivity,
      reportee_email: reportee_email,
      images: images,
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
  const addImageField = () => setImages([...images, ""]);

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(value) => setIsDialogOpen(value)}
    >
      <DialogTrigger className="border-black-500 rounded-md border-2 border-secondary p-1 px-2">
        Add Bug Report
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Bug Report</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="bg-black-100 rounded-md p-4">
          {/* Bug Title */}
          <div className="mb-4">
            <label className="mb-1 block">Bug Title:</label>
            <input
              type="text"
              value={bugTitle}
              onChange={(e) => setBugTitle(e.target.value)}
              className="w-full rounded border border-white/10 bg-background p-2 text-white"
              required
            />
          </div>

          {/* Bug Description */}
          <div className="mb-4">
            <label className="mb-1 block">Bug Description:</label>
            <textarea
              value={bugDescription}
              onChange={(e) => setBugDescription(e.target.value)}
              className="w-full rounded border border-white/10 bg-background p-2 text-white"
              required
            />
          </div>

          {/* Bug Sensitivity */}
          <div className="mb-4">
            <label className="mb-1 block">Bug Sensitivity:</label>
            <input
              type="checkbox"
              checked={bugSensitivity}
              onChange={(e) => setBugSensitivity(e.target.checked)}
              className="mr-2"
            />
            <span className="text-white">Sensitive</span>
          </div>

          {/* Reportee Email */}
          <div className="mb-4">
            <label className="mb-1 block">Reportee Email:</label>
            <input
              type="email"
              value={reportee_email}
              onChange={(e) => setReporteeEmail(e.target.value)}
              className="w-full rounded border border-white/10 bg-background p-2 text-white"
              required
            />
          </div>

          {/* Images */}
          <h3 className="font-semibold text-white">Images (URLs):</h3>
          {images.map((image, index) => (
            <div key={index} className="mb-2 flex text-white">
              <input
                type="url"
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                className="w-full rounded border border-white/10 bg-background p-2"
                placeholder="Image URL"
              />
              {index === images.length - 1 && ( // Show button only for the last input
                <button
                  type="button"
                  onClick={addImageField}
                  className="ml-2 text-blue-500"
                >
                  + Add Image
                </button>
              )}
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
          >
            Submit Bug Report
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

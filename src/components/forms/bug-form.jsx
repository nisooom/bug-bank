import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { UploadDropzone } from "@uploadthing/react";
import { UploadButton } from "@uploadthing/react";

export const CreateBugReportForm = ({ onSubmit }) => {
  const [bugTitle, setBugTitle] = useState("");
  const [bugDescription, setBugDescription] = useState("");
  const [bugSensitivity, setBugSensitivity] = useState(false);
  const [reporteeEmails, setReporteeEmails] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [images, setImages] = useState([""]); // Array for image URLs
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Validate email input
  const isValidEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    create_new_bug_report(
      bugTitle,
      bugDescription,
      bugSensitivity,
      reporteeEmails,
      images,
    );

    const bugData = {
      bug_title: bugTitle,
      bug_description: bugDescription,
      bug_sensitivity: bugSensitivity,
      reportee_emails: reporteeEmails,
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

  // Add new reportee email
  const addReporteeEmail = () => {
    if (newEmail.trim() !== "" && isValidEmail(newEmail)) {
      setReporteeEmails([...reporteeEmails, newEmail.trim()]);
      setNewEmail("");
    }
  };

  // Remove reportee email
  const removeReporteeEmail = (index) => {
    const newEmails = [...reporteeEmails];
    newEmails.splice(index, 1);
    setReporteeEmails(newEmails);
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(value) => setIsDialogOpen(value)}
    >
      <DialogTrigger className="border-black-500 rounded-md border-2 border-secondary p-1 px-2">
        Add Bug Report
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="px-4">
          <DialogTitle className="text-2xl font-bold text-white">
            Create New Bug Report
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="bg-black-100 rounded-md p-4">
          {/* Bug Title */}
          <div className="mb-4">
            <label className="mb-1 block">Bug Title:</label>
            <input
              type="text"
              value={bugTitle}
              onChange={(e) => setBugTitle(e.target.value)}
              className="w-full rounded border border-white/10 bg-background px-2 py-1 text-white"
              required
            />
          </div>

          {/* Bug Description */}
          <div className="mb-4">
            <label className="mb-1 block">Bug Description:</label>
            <textarea
              value={bugDescription}
              onChange={(e) => setBugDescription(e.target.value)}
              className="w-full rounded border border-white/10 bg-background px-2 py-1 text-white"
              required
            />
          </div>

          {/* Bug Sensitivity */}
          <div className="mb-4 flex items-center gap-2">
            <label className="block">Bug Sensitivity:</label>
            <div className="flex items-center justify-center gap-0">
              <input
                type="checkbox"
                checked={bugSensitivity}
                onChange={(e) => setBugSensitivity(e.target.checked)}
                className="mr-2 hover:cursor-pointer"
              />
              <span className="text-white">Sensitive</span>
            </div>
          </div>

          {/* Reportee Emails */}
          <div className="mb-4">
            <label className="mb-1 block">Reportee Emails:</label>
            <div className="flex flex-wrap gap-2">
              {reporteeEmails.map((email, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-md bg-gray-700 px-2 py-1"
                >
                  <span className="text-white">{email}</span>
                  <button
                    type="button"
                    className="text-white hover:text-red-500"
                    onClick={() => removeReporteeEmail(index)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <div className="flex items-center">
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Add email"
                  className="w-full rounded border border-white/10 bg-background px-2 py-1 text-white"
                />
                <button
                  type="button"
                  className="ml-2 text-white transition-colors hover:text-secondary"
                  onClick={addReporteeEmail}
                >
                  <PlusCircle size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Images */}
          <UploadDropzone
            className="sm:ut-label:text-md border border-white/25 bg-white/5 p-1 ut-button:bg-gray-800 ut-button:p-0 ut-button:text-white ut-allowed-content:text-opacity-50 ut-label:text-sm ut-label:text-secondary ut-allowed-content:ut-uploading:text-red-300"
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Files: ", res);
              setFiles([...files, ...res]);
            }}
            onUploadError={(error) => {
              console.error("Error: ", error);
              toast({
                title: "Error",
                description: error.message,
                type: "error",
              });
            }}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 rounded bg-accent px-4 py-2 font-semibold text-white"
          >
            Submit Bug Report
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

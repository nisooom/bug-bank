import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle, X } from "lucide-react";
import { useState } from "react";

export const CreateProjectForm = ({ onSubmit }) => {
  const [projectName, setProjectName] = useState("");
  const [collaboratorEmails, setCollaboratorEmails] = useState([]);
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    create_new_project(projectName, collaboratorEmails);
    setIsDialogOpen(false);

    const projectData = {
      projectName,
      collaboratorEmails,
    };

    console.log("Project Data:", projectData);
    if (onSubmit) onSubmit(projectData);
  };

  const addCollaboratorEmail = () => {
    if (
      newCollaboratorEmail.trim() !== "" &&
      isValidEmail(newCollaboratorEmail)
    ) {
      setCollaboratorEmails([
        ...collaboratorEmails,
        newCollaboratorEmail.trim(),
      ]);
      setNewCollaboratorEmail("");
    }
  };

  const removeCollaboratorEmail = (index) => {
    const newEmails = [...collaboratorEmails];
    newEmails.splice(index, 1);
    setCollaboratorEmails(newEmails);
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(value) => setIsDialogOpen(value)}
    >
      <DialogTrigger className="border-black-500 flex aspect-square items-center justify-center rounded-md border-0 border-secondary">
        <PlusCircle className="text-white" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="px-4">
          <DialogTitle className="text-2xl font-bold text-white">
            Creating New Project
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="bg-black-100 rounded-md p-4">
          <div className="mb-4">
            <label className="mb-1 block text-white">Project Name:</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full rounded border border-white/10 bg-background px-2 py-1 text-white"
              required
            />
          </div>

          <h3 className="mb-2 font-semibold text-white">Collaborators:</h3>
          <div className="mb-4 flex flex-wrap gap-2">
            {collaboratorEmails.map((email, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-md bg-gray-700 px-2 py-1"
              >
                <span className="text-white">{email}</span>
                <button
                  type="button"
                  className="text-white hover:text-red-500"
                  onClick={() => removeCollaboratorEmail(index)}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <div className="flex items-center">
              <input
                type="email"
                value={newCollaboratorEmail}
                onChange={(e) => setNewCollaboratorEmail(e.target.value)}
                placeholder="Add collaborator email"
                className="w-full rounded border border-white/10 bg-background px-2 py-1 text-white"
              />
              <button
                type="button"
                className="ml-2 text-white transition-colors hover:text-secondary"
                onClick={addCollaboratorEmail}
              >
                <PlusCircle size={20} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 rounded bg-accent px-4 py-2 font-semibold text-white"
          >
            Create Project
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

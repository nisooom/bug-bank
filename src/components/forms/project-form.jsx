import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { addNewProject } from "@/lib/db/addNewProject";
import { useContext } from "react";
import { AuthContext } from "@/context/auth";
export const CreateProjectForm = ({ onSubmit }) => {
  const { user, loading } = useContext(AuthContext);
  const [projectName, setProjectName] = useState("");
  const [email, setEmail] = useState("");
  const [collaboratorEmails, setCollaboratorEmails] = useState([]);
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const isValidEmail = (email) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (loading) return;
    // console.log(user);
    setEmail(user?.email || "");
  }, [loading]);

  useEffect(() => {
    if (!email) return;
    setCollaboratorEmails((prev) => [...prev, email]);
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectName || collaboratorEmails.length === 0) {
      alert(
        "Please provide a project name and at least one collaborator email.",
      );
      return;
    }

    console.log("Project Details:", projectName, collaboratorEmails);

    // Call the function to add a new project
    await addNewProject({
      proj_name: projectName,
      collaborators_email: collaboratorEmails,
    });

    // Reset form fields
    setProjectName("");
    setCollaboratorEmails([]);
    setNewCollaboratorEmail("");
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
      isValidEmail(newCollaboratorEmail) &&
      !collaboratorEmails.includes(newCollaboratorEmail.trim())
    ) {
      setCollaboratorEmails((prev) => [...prev, newCollaboratorEmail.trim()]);
      setNewCollaboratorEmail("");
    } else {
      alert("Please enter a valid email or avoid duplicates.");
    }
  };

  const removeCollaboratorEmail = (index) => {
    setCollaboratorEmails((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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

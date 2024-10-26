import { create_new_project } from "@/app/lib/appwrite_functions/project_functions/project_functions";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { PlusCircle } from "lucide-react";
import { useState } from "react";


export const CreateProjectForm = ({ onSubmit }) => {
  const [projectName, setProjectName] = useState('');
  const [collaborators, setCollaborators] = useState(['']); // Initial empty string for the first collaborator
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    create_new_project(projectName, collaborators);
    setIsDialogOpen(false);
    
    const projectData = {
      projectName,
      collaborators
    };

    console.log('Project Data:', projectData);
    if (onSubmit) onSubmit(projectData); // Call the onSubmit function passed as a parameter
  };

  // Handle changes for collaborator input
  const handleCollaboratorChange = (index, value) => {
    const newCollaborators = [...collaborators];
    newCollaborators[index] = value;
    setCollaborators(newCollaborators);
  };

  // Add new input fields
  const addCollaboratorField = () => setCollaborators([...collaborators, '']);
  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(value) => setIsDialogOpen(value)}
    >
      <DialogTrigger><PlusCircle className="ml-2" /></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Creating New Project</DialogTitle>
        </DialogHeader>
        <form className="p-4 bg-black-100 rounded-md">
      {/* <h2 className="text-xl font-bold mb-4">Create a New Project</h2> */}

      {/* Project Name */}
      <div className="mb-4">
        <label className="block mb-1">Project Name:</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="border rounded p-2 w-full text-blue-500  "
          required
        />
      </div>

      {/* Collaborators */}
      <h3 className="font-semibold">Collaborators:</h3>
      {collaborators.map((collaborator, index) => (
        <div key={index} className="mb-2 flex text-blue-500">
          <input
            type="text"
            value={collaborator}
            onChange={(e) => handleCollaboratorChange(index, e.target.value)}
            className="border rounded p-2 w-full"
            placeholder="Collaborator Name"
            required
          />
          {index === collaborators.length - 1 && ( // Show button only for the last input
            <button type="button" onClick={addCollaboratorField} className="ml-2 text-blue-500">
              + Add Collaborator
            </button>
          )}
        </div>
      ))}

        <button className="btn btn-primary" onClick={handleSubmit}>
          Create Project
        </button>
    </form>
      </DialogContent>
    </Dialog>
  )
}

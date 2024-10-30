import { ChevronDown } from "lucide-react";
import { Plus } from "lucide-react";
import { X } from "lucide-react";
import { Code2 } from "lucide-react";
import { useState } from "react";

export const DeveloperSettings = ({ apiKey, collaborators, addCollaborator, removeCollaborator }) => {
  const [devOptExpanded, setDevOptExanded] = useState(false);
  const [secretToggle, setSecretToggle] = useState(false);
  const [collaboratorEmail, setCollaboratorEmail] = useState("");

  const handleCopy = () => {
    navigator.clipboard
      .writeText(apiKey)
      .then(() => {
        alert("API Key copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="px-4">
      <div className="gap-2 rounded-md border border-white/10 bg-background p-2 brightness-150">
        <button
          className="w-full items-center px-4 text-sm"
          onClick={() => setDevOptExanded(!devOptExpanded)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Code2 size={24} />
              <div className="px-4 text-2xl">Developer settings</div>
            </div>
            <ChevronDown
              size={24}
              className={`transition-transform duration-300 ${devOptExpanded ? "rotate-180" : ""}`}
            />
          </div>
        </button>
        {devOptExpanded && (
          <div className="flex flex-col p-6">
            <div className="flex items-center gap-4">
              <div className="w-1/8 text-xl">API KEY</div>
              <button onClick={handleCopy} className="flex h-14 items-center">
                {secretToggle ? (
                  <div
                    className="w-full max-w-60 overflow-hidden text-ellipsis whitespace-nowrap text-xl"
                    title={apiKey}
                  >
                    {apiKey}
                  </div>
                ) : (
                  <div className="flex h-auto w-full items-center justify-center text-2xl font-extrabold">
                    * * * * * * * * * * * * * * * * * * * *
                  </div>
                )}
              </button>
              <button
                onClick={() => setSecretToggle(!secretToggle)}
                className="ml-4 text-sm text-blue-500"
              >
                {secretToggle ? "Hide" : "Show"}
              </button>
            </div>
            <hr className="opacity-20 py-2" />
            <div className="flex">
              <div className="text-xl pr-2">Collaborators</div>
              <div className="flex flex-wrap gap-2">
                {
                  collaborators.map((user, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-md bg-gray-700 px-2 py-1"
                    >
                      <span className="text-white">{user.user_email}</span>
                      <button
                        type="button"
                        className="text-white hover:text-red-500"
                        onClick={() => removeCollaborator(user.user_email)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="flex py-2">
              <input
                className="w-56 rounded-md bg-gray-700 px-2 py-1 text-white"
                type="email"
                placeholder="Email"
                value={collaboratorEmail} onChange={(e) => setCollaboratorEmail(e.target.value)}
              />
              <button onClick={() => {addCollaborator(collaboratorEmail); setCollaboratorEmail("")}} >
                <Plus size={16} className="text-white" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

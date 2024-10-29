import { ChevronDown } from "lucide-react";
import { Code2 } from "lucide-react";
import { useState } from "react";

export const DeveloperSettings = ({ projectId, apiKey }) => {
  const [devOptExpanded, setDevOptExanded] = useState(false);
  const [secretToggle, setSecretToggle] = useState(false);

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
            <div className="flex items-center">
              <div className="w-4/12 pr-32 text-xl">API KEY</div>
              <button onClick={handleCopy} className="flex h-14 items-center">
                {secretToggle ? (
                  <div
                    className="w-[300px] max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-xl"
                    title={apiKey}
                  >
                    {apiKey}
                  </div>
                ) : (
                  <div className="flex h-auto w-[300px] items-center justify-center text-2xl font-extrabold">
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
          </div>
        )}
      </div>
    </div>
  );
};

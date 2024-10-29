
import { ChevronDown } from "lucide-react";
import { Code2 } from "lucide-react";
import { useState } from "react";


export const DeveloperSettings = ({ projectId, apiKey }) => {
  const [devOptExpanded, setDevOptExanded] = useState(false);
  const [secretToggle, setSecretToggle] = useState(false);

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
            <div className="flex">
              <div className="w-4/12 pr-32 text-xl">PROJECT ID</div>
              <button onClick={() => setSecretToggle(!secretToggle)}>
                {secretToggle ? (
                  <div className="text-xl">{projectId}</div>
                ) : (
                  <div className="text-xl font-extrabold">
                    ********************
                  </div>
                )}
              </button>
            </div>
            <hr className="my-2 opacity-20" />
            <div className="flex">
              <div className="w-4/12 pr-32 text-xl">API KEY</div>
              <button onClick={() => setSecretToggle(!secretToggle)}>
                {secretToggle ? (
                  <div className="text-xl">{apiKey}</div>
                ) : (
                  <div className="text-xl font-extrabold">
                    ********************
                  </div>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

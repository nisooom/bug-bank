"use client";
import { ClosedBugCard } from "@/components/bug-count-cards/closed-bugs";
import { OpenBugCard } from "@/components/bug-count-cards/opened-bugs";
import { PriorityBugCard } from "@/components/bug-count-cards/priority-bugs";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Code2 } from "lucide-react";
import { getProject } from "@/lib/db/getProject";
import { BugCard } from "@/components/bug-card";


export default function Page({ params }) {
  const [data, setData] = useState(null);
  const [projectExists, setProjectExists] = useState(false)
  const [isMounted, setMounted] = useState(false);
  const [devOptExpanded, setDevOptExanded] = useState(false);
  const [secretToggle, setSecretToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("high");

  const init = async () => {
    const project = await getProject(params.project_id)
    if (project === null) {
      setData({})
      return
    }

    const bugs = project.bugs

    const projectObject = {
      exists: true,
      title: project.name,
      projectId: "secret-project-id",
      apiKey: project.api_key,

      bugs: bugs,
      bugsOpened: bugs.reduce((total, bug) => total + (bug.status === "InProgress" ? 1 : 0), 0),
      bugsClosed: bugs.reduce((total, bug) => total + (bug.status !== "InProgress" ? 1 : 0), 0),
      priorityBugs: bugs.reduce((total, bug) => total + ((bug.status === "InProgress" && bug.priority === "High") ? 1 : 0), 0),
    }

    setData(projectObject)
    setProjectExists(true)
  };

  useEffect(() => {
    if (isMounted) {
      init();
    }
  }, [isMounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredBugs = data?.bugs?.filter((bug) => {
    const searchMatch = bug.title.toLowerCase().includes(searchTerm.toLowerCase())
    const isNotResolved = bug.status !== "Resolved"
    return searchMatch && isNotResolved
  });

  const sortedBugs = [...(filteredBugs || [])].sort((a, b) => {
    const priorityMap = { Low: 1, Medium: 2, High: 3 };
    if (sortOrder === "high")
      return priorityMap[b.priority] - priorityMap[a.priority];
    else
      return priorityMap[a.priority] - priorityMap[b.priority];
  });

  return data === null ? (
    <div className="text-md p-8 text-accent/50">Loading...</div>
  ) : !projectExists ? (
    <div className="">Project doesnt exist</div>
  ): (
    <>
      <div className="flex h-full w-full items-center justify-center bg-green-400/0">
        <div className="flex h-full w-full max-w-6xl flex-col gap-4 bg-red-400/0 py-4">
          <div className="flex h-72 w-full flex-col gap-2 bg-cyan-400/0 p-4 sm:h-28 sm:flex-row">
            <OpenBugCard count={data.bugsOpened} />
            <ClosedBugCard count={data.bugsClosed} />
            <PriorityBugCard count={data.priorityBugs} />
          </div>

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
                        <div className="text-xl">{data.projectId}</div>
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
                        <div className="text-xl">{data.apiKey}</div>
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

          <div className="px-4">
            <div className="gap-2 rounded-lg bg-background">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search Bugs"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-sm bg-background px-2 py-1 text-lg brightness-150"
                />
                <select
                  className="px-0text-lg rounded-sm bg-secondary"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="low">Priority Low</option>
                  <option value="high">Priority High</option>
                </select>
              </div>
              <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {sortedBugs.map((bug, index) => <BugCard key={index} bug={bug} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

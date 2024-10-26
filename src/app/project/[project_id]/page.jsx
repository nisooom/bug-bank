"use client";
import { ClosedBugCard } from "@/components/bug-cards/closed-bugs";
import { OpenBugCard } from "@/components/bug-cards/opened-bugs";
import { PriorityBugCard } from "@/components/bug-cards/priority-bugs";
import { useEffect, useState } from "react";
import { Code2 } from "lucide-react";
import { ArrowBigDown } from "lucide-react";
import { Search } from "lucide-react";
import { Circle } from "lucide-react";

const getProject = (projectId) => {
  return {
    title: `Project title {id: ${projectId}}`,
    bugsOpened: 123,
    bugsClosed: 1,
    priorityBugs: 3121,
    projectId: "project-id-lol",
    apiKey: "secret-key-lol",
    bugs: new Array(10).fill(0).map((_, i) => ({
      title: `Bug ${i}`,
      description: `Bug description bug ${i}`,
      priority: i % 3 === 0 ? "Low" : i % 3 === 1 ? "Medium" : "High",
    })),
  };
};

export default function Page({ params }) {
  const [data, setData] = useState(null);
  const [isMounted, setMounted] = useState(false);
  const [devOptExpanded, setDevOptExanded] = useState(false);
  const [secretToggle, setSecretToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("none");

  const init = () => {
    const project = getProject(params.project_id);
    setData(project);
  };

  useEffect(() => {
    init();
  }, []);

  const filteredBugs = data?.bugs.filter((bug) =>
    bug.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const priorityOrder = {
    Low: 1,
    Medium: 2,
    High: 3,
  };

  const sortedBugs = [...(filteredBugs || [])].sort((a, b) => {
    if (sortOrder === "high")
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    if (sortOrder === "low")
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    return 0;
  });
  useEffect(() => {
    if (isMounted) {
      init();
    }
  }, [isMounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return data === null ? (
    <div className="text-4xl text-red-500">Loading...</div>
  ) : (
    <>
      <div className="flex h-full w-full items-center justify-center bg-green-400/0">
        <div className="flex h-full w-full max-w-6xl flex-col gap-4 bg-red-400/0 py-4">
          <div className="flex h-72 w-full flex-col gap-2 bg-cyan-400/0 p-4 sm:h-28 sm:flex-row">
            <OpenBugCard count={249} />
            <ClosedBugCard count={123} />
            <PriorityBugCard count={211} />
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
                  <ArrowBigDown
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
                  className="rounded-sm bg-secondary px-2 text-lg"
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="low">Priority Low</option>
                  <option value="high">Priority High</option>
                </select>
              </div>
              <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {sortedBugs.map((bug, index) => (
                  <button
                    key={index}
                    className="flex flex-col gap-2 rounded-md bg-background p-4 brightness-200"
                  >
                    <div className="w-min rounded-md bg-white/5">
                      <div className="flex items-center justify-center gap-1 px-2 py-1">
                        <Circle
                          size={12}
                          className="rounded-full border-0 stroke-none"
                          fill={`${bug.priority === "High" ? "red" : bug.priority === "Medium" ? "orange" : "lime"}`}
                        />
                        {bug.priority}
                      </div>
                    </div>
                    <div>
                      <div className="text-left text-xl">{bug.title}</div>
                      <div className="text-left text-sm text-slate-700">
                        {bug.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

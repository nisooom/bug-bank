"use client";
import { ClosedBugCard } from "@/components/bug-count-cards/closed-bugs";
import { OpenBugCard } from "@/components/bug-count-cards/opened-bugs";
import { PriorityBugCard } from "@/components/bug-count-cards/priority-bugs";
import { useEffect, useState } from "react";
import { getProject } from "@/lib/db/getProject";
import { BugCard } from "@/components/bug-card";
import { DeveloperSettings } from "@/components/developer-settings";

export default function Page({ params }) {
  const [data, setData] = useState(null);
  const [projectExists, setProjectExists] = useState(false);
  const [isMounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("high");

  const init = async () => {
    const project = await getProject(params.project_id);
    if (project === null) {
      setData({});
      return;
    }

    const bugs = project.bugs;

    const projectObject = {
      exists: true,
      title: project.name,
      projectId: "secret-project-id",
      apiKey: project.api_key,

      bugs: bugs,
      bugsOpened: bugs.reduce(
        (total, bug) => total + (bug.status === "InProgress" ? 1 : 0),
        0,
      ),
      bugsClosed: bugs.reduce(
        (total, bug) => total + (bug.status !== "InProgress" ? 1 : 0),
        0,
      ),
      priorityBugs: bugs.reduce(
        (total, bug) =>
          total +
          (bug.status === "InProgress" && bug.priority === "High" ? 1 : 0),
        0,
      ),
    };

    setData(projectObject);
    setProjectExists(true);
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
    const searchMatch = bug.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const isNotResolved = bug.status === "InProgress";
    return searchMatch && isNotResolved;
  });

  const sortedBugs = [...(filteredBugs || [])].sort((a, b) => {
    const priorityMap = { Low: 1, Medium: 2, High: 3, Unassigned: 4*(sortOrder === 'high') };
    if (sortOrder === "high")
      return priorityMap[b.priority] - priorityMap[a.priority];
    else return priorityMap[a.priority] - priorityMap[b.priority];
  });

  const priorityChanged = (bug, priority) => {
    console.log(bug, priority)
    bug.priority = priority
    setData({...data})
  }
  const statusChanged = (bug, status) => {
    console.log(bug, status)
    bug.status = status
    setData({...data})
  }

  return data === null ? (
    <div className="text-md p-8 text-accent/50">Loading...</div>
  ) : !projectExists ? (
    <div className="">Project doesnt exist</div>
  ) : (
    <>
      <div className="flex h-full w-full items-center justify-center bg-green-400/0">
        <div className="flex h-full w-full max-w-6xl flex-col gap-4 bg-red-400/0 py-4">
          <div className="flex h-72 w-full flex-col gap-2 bg-cyan-400/0 p-4 sm:h-28 sm:flex-row">
            <OpenBugCard count={data.bugsOpened} />
            <PriorityBugCard count={data.priorityBugs} />
            <ClosedBugCard count={data.bugsClosed} />
          </div>

          <DeveloperSettings projectId={data.projectId} apiKey={data.apiKey} />

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
                {sortedBugs.map((bug, index) => (
                  <BugCard
                    key={index}
                    bug={bug}
                    priorityChanged={(priority) => priorityChanged(bug, priority)}
                    statusChanged={(status) => statusChanged(bug, status)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";
import { ClosedBugCard } from "@/components/bug-count-cards/closed-bugs";
import { OpenBugCard } from "@/components/bug-count-cards/opened-bugs";
import { PriorityBugCard } from "@/components/bug-count-cards/priority-bugs";
import { useContext, useEffect, useState } from "react";
import { getProject } from "@/lib/db/getProject";
import { BugCard } from "@/components/bug-card";
import { DeveloperSettings } from "@/components/developer-settings";
import { updateBug } from "@/lib/db/bug-queries";
import { HelpCircle } from "lucide-react";
import Link from "next/link";
import { getUser } from "@/lib/db/getUser";
import { setProjectCollaborators } from "@/lib/db/projectCollaborators";
import { AuthContext } from "@/context/auth";


export default function Page({ params }) {
  const [data, setData] = useState(null);
  const [projectExists, setProjectExists] = useState(false);
  const [isMounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("high");
  const { user } = useContext(AuthContext)

  const init = async () => {
    const project = await getProject(params.project_id);
    if (project === null) {
      setData({});
      return;
    }

    const bugs = project.bugs;

    const projectObject = {
      id: project.$id,
      title: project.name,
      projectId: "secret-project-id",
      apiKey: project.api_key,
      users: project.users,

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

  const resolvedBugs = data?.bugs?.filter((bug) => {
    const searchMatch = bug.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const isNotResolved = bug.status !== "InProgress";
    return searchMatch && isNotResolved;
  });

  const sortedBugs = [...(filteredBugs || [])].sort((a, b) => {
    const priorityMap = {
      Low: 1,
      Medium: 2,
      High: 3,
      Unassigned: 4 * (sortOrder === "high"),
    };
    if (sortOrder === "high")
      return priorityMap[b.priority] - priorityMap[a.priority];
    else return priorityMap[a.priority] - priorityMap[b.priority];
  });

  const priorityChanged = (bug, priority) => {
    if (bug.priority === "High")
      data.priorityBugs -= 1
    if (priority === "High")
      data.priorityBugs += 1

    bug.priority = priority;
    setData({ ...data });
    updateBug({ bugId: bug.$id, data: { priority } });
  };

  const statusChanged = (bug, status) => {
    if (bug.status === "InProgress")
      data.bugsOpened -= 1
    else
      data.bugsClosed -= 1
    if (status === "InProgress")
      data.bugsOpened += 1
    else
      data.bugsClosed += 1
    bug.status = status;
    setData({ ...data });
    updateBug({ bugId: bug.$id, data: { status } });
  };

  const addCollaborator = async (email) => {
    if (data.users.filter(user => user.user_email === email).length) {
      return
    }

    const newUser = (await getUser(email)).documents[0] ?? null
    if (newUser !== null) {
      setProjectCollaborators({ projectId: data.id, collaboratorsIds: [...data.users.map(user => user.$id), newUser.$id] })
      setData({ ...data, users: [...data.users, newUser] });
    } else {
      alert(`No user with email ${email} found`);
    }
  };

  const removeCollaborator = async (email) => {
    if (email === user.email) {
      return
    }

    setProjectCollaborators({ projectId: data.id, collaboratorsIds: data.users.filter(user => user.user_email !== email).map(user => user.$id) })
    setData({ ...data, users: data.users.filter(user => user.user_email !== email) });
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

          <DeveloperSettings apiKey={data.apiKey} collaborators={data.users} addCollaborator={addCollaborator} removeCollaborator={removeCollaborator} />

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
                  className="text-lg rounded-sm bg-secondary"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="low">Priority Low</option>
                  <option value="high">Priority High</option>
                </select>
              </div>
              <section className="flex flex-col rounded-lg bg-background py-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {sortedBugs.map((bug, index) => (
                    <BugCard
                      key={index}
                      bug={bug}
                      priorityChanged={(priority) =>
                        priorityChanged(bug, priority)
                      }
                      statusChanged={(status) => statusChanged(bug, status)}
                    />
                  ))}
                </div>
              </section>

              {sortedBugs.length === 0 && (
                <div className="flex w-full flex-col gap-2 rounded border border-white/15 p-4 px-4">
                  <span className="flex items-center gap-2 text-xl font-bold text-accent/75">
                    <HelpCircle className="h-full w-6" />
                    Dont know where to Start?
                  </span>

                  <span className="text-md py-2">
                    Take a look at our
                    <Link
                      href="/docs"
                      className="px-1 text-accent/75 underline"
                    >
                      Quick Start
                    </Link>
                    Guide to get started
                  </span>
                </div>
              )}

              {resolvedBugs.length > 0 && (
                <section className="flex flex-col rounded-lg bg-background py-4">
                  <hr className="border-t-1 border-white/10 py-2" />
                  <h1 className="text-left text-2xl font-bold text-accent/50">
                    Resolved Bugs
                  </h1>
                  <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {resolvedBugs.map((bug, index) => (
                      <BugCard
                        key={index}
                        bug={bug}
                        showStatus={true}
                        priorityChanged={(priority) =>
                          priorityChanged(bug, priority)
                        }
                        statusChanged={(status) => statusChanged(bug, status)}
                      />
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";
import { ClosedBugCard } from "@/components/bug-count-cards/closed-bugs";
import { OpenBugCard } from "@/components/bug-count-cards/opened-bugs";
import { PriorityBugCard } from "@/components/bug-count-cards/priority-bugs";
import React, { useEffect, useState } from "react";
import { ProjectCard } from "@/components/dashboard-project-card";
import { PlusCircle, Loader } from "lucide-react";
import { CreateProjectForm } from "@/components/forms/project-form.jsx";
import { getProjects } from "@/lib/db/getProject";
import { AuthContext } from "@/context/auth";
import { useContext } from "react";


const Page = () => {
  const [projects, setProjects] = useState([]);
  const [email, setEmail] = useState("");
  const { user, loading: authLoading } = useContext(AuthContext);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bugCounts, setBugCounts] = useState({})

  const fetchProjects = async () => {
    setLoading(true);
    const projects = await getProjects({ email: email });
    setProjects(projects);

    setBugCounts({
      openBugs: projects.reduce(
        (total, project) => total + project.bugs.reduce((total, bug) => total + (bug.status === "InProgress" ? 1 : 0), 0),
        0,
      ),
      closedBugs: projects.reduce(
        (total, project) => total + project.bugs.reduce((total, bug) => total + (bug.status !== "InProgress" ? 1 : 0), 0),
        0,
      ),
      prioriyBugs: projects.reduce(
        (total, project) => total + project.bugs.reduce((total, bug) => total + (bug.status === "InProgress" && bug.priority === "High" ? 1 : 0), 0),
        0,
      ),
    })
    setLoading(false);
  };

  useEffect(() => {
    setIsMounted(true);
    if (isMounted && email) {
      fetchProjects();
    }
    return () => {
      setIsMounted(false);
    };
  }, [email]);

  useEffect(() => {
    if (authLoading) return;
    setEmail(user?.email || "");
  }, [authLoading]);

  if (authLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#0C1017]">
        <Loader className="animate-spin" size={48} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#0C1017]">
        <div className="flex flex-col items-center gap-4">
          <div className="text-2xl font-bold text-white">
            You are not logged in.
          </div>
          <a
            href="/api/auth/login"
            className="flex items-center gap-2 rounded-lg bg-orange-400 px-4 py-2 text-lg font-bold text-white"
          >
            <PlusCircle size={24} />
            Log in
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-[#0C1017]">
      <div className="h-full w-full max-w-6xl bg-red-400/0 py-4">
        <div className="flex h-72 w-full flex-col gap-2 bg-cyan-400/0 p-4 sm:h-28 sm:flex-row">
          <OpenBugCard count={bugCounts.openBugs} />
          <ClosedBugCard count={bugCounts.closedBugs} />
          <PriorityBugCard count={bugCounts.prioriyBugs} />
        </div>

        <div className="flex items-center gap-2 px-4 pt-6 text-2xl font-bold text-white">
          Your Projects
          <CreateProjectForm
            ownerProjectIds={projects.map((project) => project.$id)}
            onSubmit={(data) => fetchProjects()}
          />
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader className="animate-spin" size={48} />
            <span className="ml-4 text-xl">Loading projects...</span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              {projects &&
                projects.map((project, index) => (
                  <ProjectCard key={index} project={project} />
                ))}
            </div>
            {projects.length === 0 && (
              <div className="text-md w-full px-4 pb-8 text-accent/75">
                You have no projects yet. Create one to get started.
              </div>
            )}
          </>
        )}

        <div className="px-4">
          {/* <CreateBugReportForm onSubmit={(data) => console.log(data)} /> */}
        </div>
      </div>
    </div>
  );
};

export default Page;

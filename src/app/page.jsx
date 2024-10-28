"use client";
import { ClosedBugCard } from "@/components/bug-cards/closed-bugs";
import { OpenBugCard } from "@/components/bug-cards/opened-bugs";
import { PriorityBugCard } from "@/components/bug-cards/priority-bugs";
import React, { useEffect, useState } from "react";
import { ProjectCard } from "@/components/dashboard-project-card";
import { PlusCircle } from "lucide-react";
import { CreateProjectForm } from "@/components/forms/project-form.jsx";
import { getProjects } from "@/lib/db/getProject";
// import { create_new_user } from "./lib/appwrite_functions/user_functions/user_functions.js";
import { CreateBugReportForm } from "@/components/forms/bug-form.jsx";
import { AuthContext } from "@/context/auth";
import { useContext } from "react";


const Page = () => {
  const [projects, setProjects] = useState([]);

  const { user } = useContext(AuthContext);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (isMounted) {
      getProjects({ email: "shahnishumbh55@gmail.com" }).then((projects) => {
        setProjects(projects);
      });
    }
    return () => {
      setIsMounted(false);
    };
  }, [isMounted]);


  

  return (
    <div className="flex h-full w-full items-center justify-center bg-green-400/0">
      <div className="h-full w-full max-w-6xl bg-red-400/0 py-4">
        <div className="flex h-72 w-full flex-col gap-2 bg-cyan-400/0 p-4 sm:h-28 sm:flex-row">
          <OpenBugCard count={249} />
          <ClosedBugCard count={123} />
          <PriorityBugCard count={211} />
        </div>

        <div className="flex items-center gap-2 px-4 pt-6 text-2xl font-bold text-white">
          Your Projects
          <CreateProjectForm onSubmit={(data) => console.log(data)} />
        </div>
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
        <div className="px-4">
          <CreateBugReportForm onSubmit={(data) => console.log(data)} />
        </div>
      </div>
    </div>
  );
};

export default Page;

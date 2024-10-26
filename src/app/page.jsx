"use client";
import { ClosedBugCard } from "@/components/bug-cards/closed-bugs";
import { OpenBugCard } from "@/components/bug-cards/opened-bugs";
import { PriorityBugCard } from "@/components/bug-cards/priority-bugs";
import React, { useEffect, useState } from "react";
import { ProjectCard } from "@/components/dashboard-project-card";
import { PlusCircle } from "lucide-react";
import { CreateProjectForm } from "@/components/forms/new_project_form";

import { create_new_user } from "./lib/appwrite_functions/user_functions/user_functions.js";
import { CreateBugReportForm } from "@/components/forms/new_bug_report_form.jsx";

const Page = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects([
      {
        title: "Custom QR Code",
        bugsOpened: 3,
        bugsClosed: 1,
        id: "project-uno",
      },
      {
        title: "Personalised News Feed",
        bugsOpened: 8,
        bugsClosed: 6,
        id: "project-dos",
      },
      {
        title: "PSP Emulator",
        bugsOpened: 43,
        bugsClosed: 36,
        id: "project-idk",
      },
      {
        title: "Clothes Tracker",
        bugsOpened: 5,
        bugsClosed: 5,
        id: "project-4",
      },
    ]);
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center bg-green-400/0">
      <div className="h-full w-full max-w-6xl bg-red-400/0 py-4">
        <div className="flex h-72 w-full flex-col gap-2 bg-cyan-400/0 p-4 sm:h-28 sm:flex-row">
          <OpenBugCard count={249} />
          <ClosedBugCard count={123} />
          <PriorityBugCard count={211} />
        </div>

        <div className="flex items-center px-4 pt-6 text-2xl font-bold text-white">
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

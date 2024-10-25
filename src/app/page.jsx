"use client"
import { BugCard } from "@/components/dashboard-bug-card";
import { ProjectCard } from "@/components/dashboard-project-card";
import React, { useEffect, useState } from "react";


const Page = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    setProjects([
      {
        title: 'Project Uno',
        bugsOpened: 123,
        bugsClosed: 1,
      },
      {
        title: 'Project Numero 2',
        bugsOpened: 331,
        bugsClosed: 2301,
      },
      {
        title: 'Project idk',
        bugsOpened: 123,
        bugsClosed: 1,
      },
    ])
  }, [])

  return (
    <div className="w-full h-full bg-green-400 flex items-center justify-center">
      <div className="h-full w-full max-w-6xl bg-red-400">
        <div className="w-full sm:h-28 h-72 flex flex-col sm:flex-row gap-2 bg-cyan-400 p-4">
<BugCard type="open" count={249} />
<BugCard type="open" count={249} />
<BugCard type="open" count={249} />
        </div>
      </div>
    </div>
    // <div className="flex flex-col mx-24 mt-24">
    //   <div className="flex gap-4">
    //     <BugCard type="open" count={249} />
    //     <BugCard type="close" count={123} />
    //     <BugCard type="priority" count={249} />
    //   </div>
    //   <div className="flex flex-col mt-12">
    //     <div className="text-5xl font-bold">Your Projects</div>
    //     <div className="flex gap-4 mt-8">
    //       {
    //         projects.map((project) => (
    //           <ProjectCard key={project.title} project={project} />
    //         ))
    //       }
    //     </div>
    //   </div>
    // </div>
  );
};

export default Page;

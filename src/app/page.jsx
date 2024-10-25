"use client"
import { ClosedBugCard } from "@/components/bug-cards/closed-bugs";
import { OpenBugCard } from "@/components/bug-cards/opened-bugs";
import { PriorityBugCard } from "@/components/bug-cards/priority-bugs";
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
          <OpenBugCard count={249} />
          <ClosedBugCard count={123} />
          <PriorityBugCard count={2311} />
        </div>
      </div>
    </div>
  );
};

export default Page;

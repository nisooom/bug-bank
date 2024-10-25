"use client"
import { ClosedBugCard } from "@/components/bug-cards/closed-bugs"
import { OpenBugCard } from "@/components/bug-cards/opened-bugs"
import { PriorityBugCard } from "@/components/bug-cards/priority-bugs"
import { useEffect, useState } from "react"
import { Code2 } from "lucide-react"
import { ArrowBigDown } from "lucide-react"
import { Search } from "lucide-react"
import { Circle } from "lucide-react"


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
    }))
  }
}


export default function Page({ params }) {
  const [data, setData] = useState(null)
  const [isMounted, setMounted] = useState(false)
  const [devOptExpanded, setDevOptExanded] = useState(false)
  const [secretToggle, setSecretToggle] = useState(false)

  const init = () => {
    const project = getProject(params.project_id)
    setData(project)
  }

  useEffect(() => {
    if (isMounted) {
      init()
    }
  }, [isMounted])

  useEffect(() => {
    setMounted(true);
  }, [])

  return (
    data === null ? (
      <div className="text-4xl text-red-500">Loading...</div>
    ) : (
      <>
        <div className="flex flex-col mx-24 mt-24">
          <div className="w-full sm:h-28 h-72 flex flex-col sm:flex-row gap-2 p-4 brightness-200">
            <OpenBugCard count={data.bugsOpened} />
            <ClosedBugCard count={data.bugsClosed} />
            <PriorityBugCard count={data.priorityBugs} />
          </div>
          <div className="rounded-lg gap-2 px-4 py-3 mx-4 bg-background brightness-200">
            <button className="w-full text-4xl" onClick={() => setDevOptExanded(!devOptExpanded)}>
            <div className="flex justify-between">
              <div className="flex">
                <Code2 size={42} />
                <div className="text-4xl px-4">Developer settings</div>
              </div>
              <div className="">
                <ArrowBigDown size={42} />
              </div>
            </div>
            </button>
            {
              devOptExpanded &&
              <div className="flex flex-col p-6">
                <div className="flex">
                  <div className="text-xl pr-32 w-4/12">PROJECT ID</div>
                  <button onClick={() => setSecretToggle(!secretToggle)}>
                    {
                      secretToggle ?
                      <div className="text-xl">{data.projectId}</div> :
                      <div className="text-xl font-extrabold">********************</div>
                    }
                  </button>
                </div>
                <hr className="my-2 opacity-20" />
                <div className="flex">
                  <div className="text-xl pr-32 w-4/12">API KEY</div>
                  <button onClick={() => setSecretToggle(!secretToggle)}>
                    {
                      secretToggle ?
                      <div className="text-xl">{data.apiKey}</div> :
                      <div className="text-xl font-extrabold">********************</div>
                    }
                  </button>
                </div>
              </div>
            }
          </div>
          <div className="mt-16 rounded-lg gap-2 px-4 py-3 mx-4 bg-background brightness-200">
            <div className="flex gap-2">
              <div className="w-1/12 flex items-center justify-center">
                <Search size={32} />
              </div>
              <input type="text" placeholder="Search Bugs" className="w-full px-4 py-3 text-2xl rounded-lg bg-background brightness-150" />
              <button className="text-4xl w-2/12 bg-secondary rounded-lg">Sort By</button>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4">
              {
                data.bugs.map((bug, index) => (
                  <button key={index} className="bg-background brightness-200 p-4 rounded-lg">
                    <div className="w-min bg-background brightness-200 rounded-xl">
                      <div className="flex items-center justify-center px-3 py-1 gap-2 mb-1">
                        <Circle size={20} fill={`${bug.priority === "High" ? "red" : bug.priority === "Medium" ? "orange" : "lime"}`} />
                        {bug.priority}
                      </div>
                    </div>
                    <div className="text-left text-2xl">{bug.title}</div>
                    <div className="text-left text-lg text-slate-700">{bug.description}</div>
                  </button>
                ))
              }
            </div>
          </div>
        </div>
      </>
    )
  )
}

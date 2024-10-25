"use client"
import { ClosedBugCard } from "@/components/bug-cards/closed-bugs"
import { OpenBugCard } from "@/components/bug-cards/opened-bugs"
import { PriorityBugCard } from "@/components/bug-cards/priority-bugs"
import { useEffect, useState } from "react"
import { Code2 } from "lucide-react"
import { ArrowBigDown } from "lucide-react"


export default function Page({ params }) {
  const [data, setData] = useState(null)
  const [isMounted, setMounted] = useState(false)
  const [devOptExpanded, setDevOptExanded] = useState(false)
  const [secretToggle, setSecretToggle] = useState(false)

  const init = () => {
    setData({
      title: `Project title {id: ${params.project_id}}`,
      bugsOpened: 123,
      bugsClosed: 1,
      priorityBugs: 3121,
      projectId: "project-id-lol",
      apiKey: "secret-key-lol",
      bugs: [
        {
          priority: "High",
          title: "Bug 1",
          description: "Bug 1 description",
        },
        {
          priority: "Low",
          title: "Bug 2",
          description: "Bug 2 description",
        },
        {
          priority: "Medium",
          title: "Bug 3",
          description: "Bug 3 description",
        },
      ]
    })
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
        </div>
      </>
    )
  )
}

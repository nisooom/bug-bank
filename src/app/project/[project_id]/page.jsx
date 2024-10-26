"use client";
import { ClosedBugCard } from "@/components/bug-cards/closed-bugs";
import { OpenBugCard } from "@/components/bug-cards/opened-bugs";
import { PriorityBugCard } from "@/components/bug-cards/priority-bugs";
import { useEffect, useState } from "react";
import { Code2 } from "lucide-react";
import { ArrowBigDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TalkWithLlamaLocal } from "@/actions/llama";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TalkWithLlama } from "@/actions/llama";
import { ItemCardCarousel } from "@/components/item-card-carousel";
import { Circle } from "lucide-react";
import { GetDocumentAndSendToLlama } from "@/actions/llama";
const getProject = (projectId) => {
  return {
    title: `Project title {id: ${projectId}}`,
    bugsOpened: 123,
    bugsClosed: 1,
    priorityBugs: 3121,
    projectId: "project-id-lol",
    apiKey: "secret-key-lol",
    bugs: new Array(10).fill(0).map((_, i) => ({
      title: `Authorisation not working`,
      description: `OAuth providers callback urls not working using supabase`,
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
  const [AISummary, setAISummary] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const init = () => {
    const project = getProject(params.project_id);
    setData(project);
  };

  const handleLamma = async ({ title, description }) => {
    try {
      const response = await TalkWithLlama({
        title,
        description,
      });

      setAISummary(response);
      // remove \n and *
      console.log("response", response);
      const cleanedSummary = AISummary.response.replace(/[\n]/g, " ");
      const cleanedSummary2 = cleanedSummary.replace(/[*]/g, "");
      setAISummary(cleanedSummary2);
    } catch (error) {
      console.error("Error sending document to LLAMA:", error);
    }
  };

  const handleLammaLocal = async ({ title, description }) => {
    setIsLoading(true); // Set loading to true
    try {
      const message = `${title} ${description} this is my bug explain it very briefly in less than 40 words`;
      const response = await TalkWithLlamaLocal({
        content: message,
      });

      console.log("response", response);
      setAISummary(response);
    } catch (error) {
      console.error("Error sending document to LLAMA:", error);
    } finally {
      setIsLoading(false); // Set loading to false after completion
    }
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
    <div className="text-md p-8 text-accent/50">Loading...</div>
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
                  <Dialog>
                    <DialogTrigger
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
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Circle
                            size={12}
                            className="rounded-full border-0 stroke-none"
                            fill={`${bug.priority === "High" ? "red" : bug.priority === "Medium" ? "orange" : "lime"}`}
                          />
                          {bug.title}
                        </DialogTitle>
                        <DialogDescription className="text-left text-slate-500">
                          {bug.description}
                        </DialogDescription>
                      </DialogHeader>
                      <ItemCardCarousel
                        items={new Array(3).fill(0).map((_, i) => ({
                          title: `Image ${i}`,
                          description: `Image description ${i}`,
                          imgSrc: `https://picsum.photos/seed/${i}/500/300`,
                        }))}
                      />
                      <Button
                        className="w-full rounded-md bg-accent text-white hover:bg-secondary"
                        onClick={() =>
                          // handleLamma({
                          //   title: bug.title,
                          //   description: bug.description,
                          // })
                          handleLammaLocal({
                            title: bug.title,
                            description: bug.description,
                          })
                        }
                      >
                        Ask AI
                      </Button>
                      {isLoading && (
                        <div className="text-center text-lg text-gray-500">
                          Generating summary...
                        </div>
                      )}
                      <div className="text-left text-lg text-slate-500">
                        {JSON.stringify(AISummary)}
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

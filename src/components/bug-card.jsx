import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ItemCardCarousel } from "@/components/item-card-carousel";
import { Circle } from "lucide-react";
import { useState } from "react";
import { TalkWithLlama, TalkWithLlamaLocal } from "@/actions/llama";
import { Pen } from "lucide-react";
import { PenOff } from "lucide-react";

const ViewBugDialogContent = ({
  bug,
  setEditing,
  handleAi,
  isLoading,
  AISummary,
}) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center justify-between gap-2">
          <div className="flex gap-2">
            <Circle
              size={12}
              className="rounded-full border-0 stroke-none"
              fill={`${bug.priority === "High" ? "red" : bug.priority === "Medium" ? "orange" : bug.priority === "Low" ? "lime" : "grey"}`}
            />
            {bug.title}
          </div>

          <Button
            className="aspect-square h-8 bg-white/10 hover:bg-white/5"
            onClick={() => setEditing(true)}
          >
            <Pen className="h-12 p-0 text-white" />
          </Button>
        </DialogTitle>
        <DialogDescription className="text-left text-slate-500">
          {bug.description}
        </DialogDescription>
      </DialogHeader>
      <ItemCardCarousel items={bug.imageUrls} />
      <Button
        className="w-full rounded-md bg-accent text-white hover:bg-secondary"
        // onClick={() => handleAi({ title: bug.title, description: bug.description, local: true })}
        onClick={() =>
          handleAi({
            title: bug.title,
            description: bug.description,
            local: false,
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
    </>
  );
};

const EditBugDialogContent = ({
  bug,
  setEditing,
  handleAi,
  isLoading,
  AISummary,
  priorityChanged,
  statusChanged,
}) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center justify-between gap-2">
          <div className="flex gap-2">
            <Circle
              size={12}
              className="rounded-full border-0 stroke-none"
              fill={`${bug.priority === "High" ? "red" : bug.priority === "Medium" ? "orange" : bug.priority === "Low" ? "lime" : "grey"}`}
            />
            {bug.title}
          </div>

          <Button
            className="aspect-square h-8 bg-white/10 hover:bg-white/5"
            onClick={() => setEditing(false)}
          >
            <PenOff className="h-12 p-0 text-white" />
          </Button>
        </DialogTitle>
        <DialogDescription className="text-left text-slate-500">
          {bug.description}
        </DialogDescription>
      </DialogHeader>

      <div className="flex items-center">
        <div className="w-1/3">change priority</div>
        <div className="flex w-2/3 gap-2 pr-2">
          <Button
            onClick={() => priorityChanged("Low")}
            className="h-8 flex-grow bg-yellow-200 text-black hover:bg-yellow-300"
          >
            Low
          </Button>
          <Button
            onClick={() => priorityChanged("Medium")}
            className="h-8 flex-grow bg-orange-300 text-black hover:bg-orange-400"
          >
            Medium
          </Button>
          <Button
            onClick={() => priorityChanged("High")}
            className="h-8 flex-grow bg-red-300 text-black hover:bg-red-400"
          >
            High
          </Button>
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-1/3">change status</div>
        <div className="flex w-2/3 gap-2 pr-2">
          <Button
            onClick={() => statusChanged("InProgress")}
            className="h-8 flex-grow bg-yellow-200 text-black hover:bg-yellow-300"
          >
            InProgress
          </Button>
          <Button
            onClick={() => statusChanged("FOT")}
            className="h-8 flex-grow bg-lime-300 text-black hover:bg-lime-400"
          >
            FOT
          </Button>
          <Button
            onClick={() => statusChanged("Resolved")}
            className="h-8 flex-grow bg-emerald-400 text-black hover:bg-emerald-500"
          >
            Resolved
          </Button>
        </div>
      </div>

      <ItemCardCarousel items={bug.imageUrls} />
      <Button
        className="w-full rounded-md bg-accent text-white hover:bg-secondary"
        // onClick={() => handleAi({ title: bug.title, description: bug.description, local: true })}
        onClick={() =>
          handleAi({
            title: bug.title,
            description: bug.description,
            local: false,
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
    </>
  );
};

export const BugCard = ({ bug, showStatus, priorityChanged, statusChanged }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [AISummary, setAISummary] = useState("");
  const [isEditing, setEditing] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false)

  const handleAi = async ({ title, description, local }) => {
    const handleLlamma = async ({ title, description }) => {
      try {
        const response = await TalkWithLlama({
          title,
          description,
        });
        console.log("non local response", response.response);
        const cleanedSummary = response.response.replace(/[\n]/g, " ");
        const cleanedSummary2 = cleanedSummary.replace(/[*]/g, "");
        setAISummary(cleanedSummary2);
      } catch (error) {
        console.error("Error sending document to LLAMA:", error);
      }
    };

    const handleLlammaLocal = async ({ title, description }) => {
      try {
        const message = `${title} ${description} this is my bug explain it very briefly in less than 40 words`;
        const response = await TalkWithLlamaLocal({
          content: message,
        });

        console.log("local response", response);
        setAISummary(response);
      } catch (error) {
        console.error("Error sending document to LLAMA:", error);
      }
    };

    setIsLoading(true);
    handleLlamma({ title, description }).then(setIsLoading(false));
  };

  const priorityChangedHandler = (newPriority) => {
    bug.priority !== newPriority && priorityChanged(newPriority);
    setDialogOpen(false)
  }
  
  const statusChangedHandler = (newStatus) => {
    bug.status !== newStatus && statusChanged(newStatus);
    setDialogOpen(false)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className="flex flex-col gap-2 rounded-md bg-background p-4 brightness-200">
        <div className="flex rounded-md bg-white/5 gap-12">
          <div className="flex items-center justify-center gap-1 px-2 py-1">
            <Circle
              size={12}
              className="rounded-full border-0 stroke-none"
              fill={`${bug.priority === "High" ? "red" : bug.priority === "Medium" ? "orange" : bug.priority === "Low" ? "lime" : "grey"}`}
            />
            {bug.priority}
          </div>
          {
            showStatus && (
              <div className="items-center justify-center px-2 py-1">
                {bug.status}
              </div>
            )
          }
        </div>
        <div>
          <div className="text-left text-xl">{bug.title}</div>
          <div className="text-left text-sm text-slate-700">
            {bug.description}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="pt-12">
        {isEditing ? (
          <EditBugDialogContent
            bug={bug}
            setEditing={setEditing}
            handleAi={handleAi}
            isLoading={isLoading}
            priorityChanged={priorityChangedHandler}
            statusChanged={statusChangedHandler}
            AISummary={AISummary}
          />
        ) : (
          <ViewBugDialogContent
            bug={bug}
            setEditing={setEditing}
            handleAi={handleAi}
            isLoading={isLoading}
            AISummary={AISummary}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

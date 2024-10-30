
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


export const BugCard = ({ bug }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [AISummary, setAISummary] = useState("");

  const handleAi = async ({ title, description, local }) => {
    const handleLlamma = async ({ title, description }) => {
      try {
        const response = await TalkWithLlama({
          title,
          description,
        });
        console.log("non local response", response);
        setAISummary(response.response);
        const cleanedSummary = AISummary.response.replace(/[\n]/g, " ");
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

    setIsLoading(true)
    const f = local ? handleLlammaLocal : handleLlamma
    f({ title, description }).then(
      setIsLoading(false)
    )
  }

  return (
    <Dialog>
      <DialogTrigger
        className="flex flex-col gap-2 rounded-md bg-background p-4 brightness-200"
      >
        <div className="w-min rounded-md bg-white/5">
          <div className="flex items-center justify-center gap-1 px-2 py-1">
            <Circle
              size={12}
              className="rounded-full border-0 stroke-none"
              fill={`${bug.priority === "High" ? "red" : bug.priority === "Medium" ? "orange" : bug.priority === "Low" ? "lime" : "grey"}`}
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
              fill={`${bug.priority === "High" ? "red" : bug.priority === "Medium" ? "orange" : bug.priority === "Low" ? "lime" : "grey"}`}
            />
            {bug.title}
          </DialogTitle>
          <DialogDescription className="text-left text-slate-500">
            {bug.description}
          </DialogDescription>
        </DialogHeader>
        <ItemCardCarousel items={bug.imageUrls} />
        <Button
          className="w-full rounded-md bg-accent text-white hover:bg-secondary"
          // onClick={() => handleAi({ title: bug.title, description: bug.description, local: true })}
          onClick={() => handleAi({ title: bug.title, description: bug.description, local: false })}
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
  )
}
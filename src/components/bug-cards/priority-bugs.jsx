import { LucideMessageCircleWarning } from "lucide-react";

export const PriorityBugCard = ({ count }) => {
  return (
    <div className="flex h-full w-full flex-grow gap-2 rounded-lg bg-white/[7.5%] px-2 py-2 sm:w-1/3">
      <div className="flex items-center justify-center">
        <div className="flex aspect-square h-full items-center justify-center rounded-md bg-red-600">
          <LucideMessageCircleWarning size={48} />
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="text-3xl font-bold">{count}</div>
        <div className="text-lg font-medium">Priority Bugs</div>
      </div>
    </div>
  );
};

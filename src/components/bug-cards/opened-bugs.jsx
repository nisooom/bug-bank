import { BugIcon } from "lucide-react"


export const OpenBugCard = ({ count }) => {
  return (
    <div className="flex flex-grow bg-background w-full sm:w-1/3 h-full  rounded-lg gap-2 px-2 py-2">
      <div className="flex items-center justify-center">
        <div className="aspect-square rounded-md h-full flex items-center justify-center bg-blue-600">
          <BugIcon size={48} />
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="text-3xl font-bold">{count}</div>
        <div className="text-xl font-medium">
          Open Bugs
        </div>
      </div>
    </div>
  )
}

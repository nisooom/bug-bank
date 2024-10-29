import { BugOff } from "lucide-react"


export const ClosedBugCard = ({ count }) => {
  return (
    <div className="flex flex-grow  bg-white/[7.5%] w-full sm:w-1/3 h-full  rounded-lg gap-2 px-2 py-2">
      <div className="flex items-center justify-center">
        <div className="aspect-square rounded-md h-full flex items-center justify-center bg-green-600">
          <BugOff size={48} />
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="text-3xl font-bold">{count}</div>
        <div className="text-xl font-medium">
          Closed Bugs
        </div>
      </div>
    </div>
  )
}

import { LucideMessageCircleWarning } from "lucide-react"
import { BugIcon } from "lucide-react"
import { BugOff } from "lucide-react"

export const BugCard = ({ count, type }) => {
  return (
    <div className="flex flex-grow bg-background w-full sm:w-1/3 h-full  rounded-lg gap-2 px-2 py-2">
      <div className="flex items-center justify-center">
        <div
          className={`aspect-square rounded-md h-full flex items-center justify-center ${
            type === 'open' ?
            "bg-blue-600" :
            type === 'close' ?
            "bg-green-600" :
            type === 'priority' ?
            "bg-red-600" :
            ""
          }`}
        >
          {
            type === 'open' ?
            <BugIcon size={48} /> :
            type === 'close' ?
            <BugOff size={48} /> :
            type === 'priority' ?
            <LucideMessageCircleWarning size={48} /> :
            null
          }
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="text-3xl font-bold">{count}</div>
        <div className="text-xl font-medium">
        {
            type === 'open' ?
            "Open Bugs" :
            type === 'close' ?
            "Closed Bugs" :
            type === 'priority' ?
            "High Priority Bugs" :
            null
          }
        </div>
      </div>
    </div>
  )
}

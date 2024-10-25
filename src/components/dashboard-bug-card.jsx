import { LucideMessageCircleWarning } from "lucide-react"
import { BugIcon } from "lucide-react"
import { BugOff } from "lucide-react"

export const BugCard = ({ count, type }) => {
  return (
    <div className="flex flex-grow bg-background brightness-200 basis-1/3 h-32 rounded-lg gap-1">
      <div className="flex items-center justify-center">
        <div
          className={`aspect-square ml-4 mr-4 w-24 flex items-center justify-center ${
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
        <div className="text-3xl font-semibold">{count}</div>
        <div className="text-2xl">
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

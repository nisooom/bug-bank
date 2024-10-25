import { Album } from 'lucide-react'

export const ProjectCard = ({ project }) => {
  return (
    <div className="flex bg-background brightness-200 basis-1/4 gap-2 h-24 rounded-lg p-2">
      <div className="flex items-center justify-center">
        <div className="aspect-square rounded-md h-full flex items-center justify-center bg-blue-900">
          <Album size={48} />
        </div>
      </div>
      <div className="flex flex-col justify-center gap-1 overflow-hidden">
        <div className="text-xl font-semibold h-1/3 overflow-hidden text-ellipsis whitespace-nowrap">{project.title}</div>
        <div className="w-full h-2/3 text">  <div className="text-sm   overflow-hidden text-ellipsis whitespace-nowrap">{project.bugsOpened} bugs opened</div>
        <div className="text-sm  overflow-hidden text-ellipsis whitespace-nowrap">{project.bugsClosed} bugs closed</div></div>
      
      </div>
    </div>
  )
}
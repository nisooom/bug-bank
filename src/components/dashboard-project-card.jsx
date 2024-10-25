
import { Album } from 'lucide-react'


export const ProjectCard = ({ project }) => {
  return (
    <div className="flex bg-background brightness-200 basis-1/4 h-32 rounded-lg">
      <div className="flex items-center justify-center">
        <div className="aspect-square ml-4 mr-4 w-24 flex items-center justify-center bg-blue-900">
          <Album size={48} />
        </div>
      </div>
      <div className="flex flex-col justify-center gap-1">
        <div className="text-3xl font-semibold">{project.title}</div>
        <div className="text-xl">{project.bugsOpened} bugs opened</div>
        <div className="text-xl">{project.bugsClosed} bugs closed</div>
      </div>
    </div>
  )
}

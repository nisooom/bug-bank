import { Album } from "lucide-react";
import Link from "next/link";
export const ProjectCard = ({ project }) => {
  return (
    <Link
      className="flex h-24 basis-1/4 gap-2 rounded-lg bg-background p-2 brightness-200"
      href={`/project/${project.$id}`}
    >
      <div className="flex items-center justify-center">
        <div className="flex aspect-square h-full items-center justify-center rounded-md bg-blue-900">
          <Album size={48} />
        </div>
      </div>
      <div className="flex flex-col justify-center gap-1 overflow-hidden">
        <div className="h-1/3 overflow-hidden text-ellipsis whitespace-nowrap text-xl font-semibold">
          {project.name}
        </div>
        <div className="text h-2/3 w-full">
          {" "}
          {/* <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {project.bugsOpened} bugs opened
          </div>
          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {project.bugsClosed} bugs closed
          </div> */}
        </div>
      </div>
    </Link>
  );
};

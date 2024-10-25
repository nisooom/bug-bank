"use client";
import { UploadDropzone } from "@uploadthing/react";
import { useState } from "react";
const page = () => {
    const [files, setFiles] = useState([]);

  return (
    <div>
        <h1>Upload</h1>
        <UploadDropzone
              className="p-1 w-1/3 h-5/6 min-w-64 ut-allowed-content:text-opacity-50 bg-transparent ut-label:text-secondary sm:ut-label:text-md ut-label:text-sm ut-allowed-content:ut-uploading:text-red-300"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                console.log("Files: ", res);
                setFiles([...files, ...res]);
              }}
              onUploadError={(error) => {
                console.error("Error: ", error);
                toast({
                  title: "Error",
                  description: error.message,
                  type: "error",
                });
              }}
            />
            {
                JSON.stringify(files)   
            }
    </div>
  )
}

export default page
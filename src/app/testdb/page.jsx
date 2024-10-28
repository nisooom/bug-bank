'use client'; // Add this line to make the component a Client Component

import React, { useState } from 'react';
import { getProjects } from '@/lib/db/getProject';
import { Button } from '@/components/ui/button';

async function getUserProjects(email) {
    const projects = await getProjects({ email: email });
    console.log(projects);
    return projects;
}

const Page = () => {
    const [projects, setProjects] = useState([]);

    const handleGetProjects = async () => {
        const data = await getUserProjects("shahnishumbh55@gmail.com");
        setProjects(data); // Store the fetched projects in state
    };

    return (
        <div className="">
            <Button onClick={handleGetProjects}>Get Projects</Button>
            {/* Optionally render the projects */}
            <div>
                {JSON.stringify(projects)}
            </div>
        </div>
    );
}

export default Page;
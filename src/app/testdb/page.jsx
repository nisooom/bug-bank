"use client";
import React from 'react'
import { GetDocumentAndSendToLlama } from '@/actions/llama';
import { useEffect } from 'react';
import { useState } from 'react';
import { getBugsFromAPI } from '@/lib/db/getReports';
import { getProjectsOfUser } from '@/lib/db/getProjects';
import { AuthContext } from '@/context/auth';
import { useContext } from 'react';


export const Page = () => {

    const user = useContext(AuthContext);
    const handleClick = async () => {
        try {
            console.log(user.email);
            const response = await getProjectsOfUser(user.email);
            console.log(response);
        } catch (error) {
            console.error('Error sending document to LLAMA:', error);
        }
  
    }

    async function getBugs() {
        const response = await getProjectsOfUser;
        console.log(response);
    }

    return (


    <div className=""> 
        <h1>Testdb</h1>

        <button onClick={handleClick}>Get Bugs Bunny</button>    
        



    </div>

    )
}


export default Page;
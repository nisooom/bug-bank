"use client";
import React from 'react'
import { GetDocumentAndSendToLlama } from '@/actions/llama';
import { useEffect } from 'react';
import { useState } from 'react';
import { getBugsFromAPI } from '@/lib/db/getReports';



export const Page = () => {

    const handleClick = async () => {
        try {
            const response = await GetDocumentAndSendToLlama("671be83f001d7975b1c6");
            console.log(response);
        } catch (error) {
            console.error('Error sending document to LLAMA:', error);
        }
  
    }

    async function getBugs() {
        const response = await getBugsFromAPI("sdfjkljsdfsdjfioefiefpuwer897389u3428hfeiwhr783fy4fj8of4u94fu984");
        console.log(response);
    }

    return (


    <div className=""> 
        <h1>Testdb</h1>

        <button onClick={getBugs}>Get Bugs</button>    
        



    </div>

    )
}


export default Page;
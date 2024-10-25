"use client";
import React from 'react'
import { GetDocumentAndSendToLlama } from '@/actions/llama';
import { useEffect } from 'react';
import { useState } from 'react';


const [data, setData] = useState(null); 

export const Page = () => {

    const handleClick = async () => {
        try {
            const response = await GetDocumentAndSendToLlama("671be83f001d7975b1c6");
            console.log(response);
            setData(response.response)
        } catch (error) {
            console.error('Error sending document to LLAMA:', error);
        }
  
    }
    return (


    <div className=""> 
        <h1>Testdb</h1>

        <button onClick={handleClick}>Send Document to LLAMA</button>    
        
        <div className="">
            {JSON.stringify(data)}
        </div>

    </div>

    )
}


export default Page;
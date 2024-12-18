"use server"

import { getSession } from "@/lib/auth";

export async function openDocument(fileName: string) {
    try {
        const token = await getSession();
        console.log(token)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/document/get_document/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ file_name: fileName })
        });

        if (!response.ok) {
            throw new Error('Network response was not okay');
        }

                return await response.blob();
                
        } catch (error) {
                throw ('Error: ' + (error as Error).message);
        }
        
}
export async function getAIResponse(command: string) {
    try {
        const token = await getSession();
        const response = await fetch('http://127.0.0.1:8000/document/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  // Added the token here
            },
            body: JSON.stringify({
                query: `query { executeCommand(command: "${command}") { query response } }`,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            const aiResponse = data?.data?.executeCommand?.response || "Sorry, something went wrong.";
            return aiResponse;  // Returning AI response to use in the UI
        } else {
            console.error('Error:', response.statusText);
            return "Error fetching response.";
        }
    } catch (error) {
        console.error('Error:', error);
        return "Error fetching response.";
    }
}
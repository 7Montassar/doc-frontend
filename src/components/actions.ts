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
                'Authorization': `${token}`
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

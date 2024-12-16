"use server"
import { getSession } from "@/lib/auth";
const endpoint = process.env.NEXT_PUBLIC_API_BASE_URL;
export const handleUpload = async (formData: FormData) => {
    const token = await getSession();

    // Send the request
    try {
        const response = await fetch(`${endpoint}/document/upload_and_save/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          method: 'POST',
          body: formData,
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Upload successful:', data);
        // You might want to show a success message to the user here
      } catch (error) {
        console.error('Error uploading the file:', error);
        // You might want to show an error message to the user here
      }
  };
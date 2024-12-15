'use client'
import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { DocumentType } from '@/types/DocumentType';

export default function DocumentTable() {
    const [documents, setDocuments] = useState<DocumentType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
    
    // Fetch documents on component mount
    useEffect(() => {
      async function fetchDocuments() {
        try {
          const response = await fetch(`${endpoint}/document/`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data: DocumentType[] = await response.json();
          setDocuments(data);
          setLoading(false);
        } catch (err) {
          setError(err as Error);
          setLoading(false);
        }
      }
  
      fetchDocuments();
    }, [endpoint]);
  
   
  
    
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error.message}</p>;
    }
  
    return (
      <div className="overflow-x-auto"> 
        {/* Success/Error message */}
        {message && (
          <p className="mb-4 p-2 rounded bg-green-200 text-green-800">{message}</p>
        )}
  
        <table className="min-w-full bg-white border border-gray-300">  
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Filename</th>
              <th className="py-2 px-4 border-b text-left">Category</th>
              <th className="py-2 px-4 border-b text-left">Created At</th>
              <th className="py-2 px-4 border-b text-left">Summary</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr
                key={doc.id}
                className={`hover:bg-gray-50 ${
                  doc.status === 'migrated' ? 'bg-gray-100' : ''
                }`}
              >
                <td className="py-2 px-4 border-b">{doc.fileName}</td>
                <td className="py-2 px-4 border-b">{doc.category}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(doc.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">{doc.summary}</td>
                <td className="py-2 px-4 border-b">
                  {doc.status === 'migrated' ? 'Migrated' : 'Pending'}
                </td>
                <td className="py-2 px-4 border-b">
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>    
      
    )
  }

  


'use client'

import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { OldDocumentType } from '@/types/OldDocumentType';

export default function OldDocumentsTable() {
  const [documents, setDocuments] = useState<OldDocumentType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const endpoint = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Fetch documents on component mount
  useEffect(() => {
    async function fetchDocuments() {
      try {
        const response = await fetch(`${endpoint}/old_documents/`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: OldDocumentType[] = await response.json();
        setDocuments(data);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    }

    fetchDocuments();
  }, [endpoint]);

  // Update status in the old document database
  const updateOldDocumentStatus = async (doc: OldDocumentType) => {
    try {
      const response = await fetch(`${endpoint}/old_documents/${doc.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'migrated',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setDocuments((prevDocs) =>
          prevDocs.map((d) =>
              d.id === doc.id ? { ...d, status: 'migrated' } : d
          )
      );
      setMessage('Document migrated successfully!');
    } catch (err) {
      setMessage(`Error: ${err instanceof Error ? err.message : 'Migration failed'}`);
    }
  };

  // Handle document migration
  const migrateDocument = async (doc: OldDocumentType) => {
    try {
      const response = await fetch(`${endpoint}/document/integrateOldDocument/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file_name: doc.filename,
          owner_id: doc.user_id,
          category: doc.category,
          created_at: doc.created_at,
          status: 'migrated',
        }),
      });

      if (!response.ok) {
        const responseText = await response.text();
        throw new Error(`Error: ${responseText || `HTTP error! Status: ${response.status}`}`);
      }

      await updateOldDocumentStatus(doc);
      setMessage('Document migrated successfully!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Migration failed';
      setMessage(`Error: ${errorMessage}`);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
      <div className="overflow-x-auto w-full">
        {message && (
            <p className="mb-4 p-2 rounded bg-green-200 text-green-800">{message}</p>
        )}

        <table className="min-w-full bg-white border border-gray-300 w-full">
          <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b text-left">Filename</th>
            <th className="py-2 px-4 border-b text-left">Category</th>
            <th className="py-2 px-4 border-b text-left">Created At</th>
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
                <td className="py-2 px-4 border-b">{doc.filename}</td>
                <td className="py-2 px-4 border-b">{doc.category}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(doc.created_at).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  {doc.status === 'migrated' ? 'Migrated' : 'Pending'}
                </td>
                <td className="py-2 px-4 border-b">
                  {doc.status === 'migrated' ? (
                      <Check className="w-5 h-5 text-green-500" />
                  ) : (
                      <button
                          onClick={() => migrateDocument(doc)}
                          className="flex items-center text-[#0E708B] hover:text-[#0E708B]/80"
                      >
                        Migrate
                        <ArrowUpRight className="w-4 h-4 ml-1" />
                      </button>
                  )}
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
}


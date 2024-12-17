'use client'
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Search, Loader2 } from 'lucide-react';
import { DocumentType } from '@/types/DocumentType';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { openDocument } from './actions';
import { getToken, getUserRole } from "@/app/dashboard/actions";
import { toast, ToastContainer } from "react-toastify";
import { getSession } from '@/lib/auth';

export default function DocumentTable() {
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserRole() {
      try {
        const role = await getUserRole();
        setUserRole(role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    }

    fetchUserRole();
  }, []);

  useEffect(() => {
    if (!userRole) return;

    async function fetchDocuments() {
      let url = "";
      switch (userRole) {
        case "admin":
          url = "";
          break;
        case "manager":
          url = "get_documents_by_manager_id/";
          break;
        case "employee":
          url = "get_documents_by_user_id/";
          break;
        default:
          break;
      }
      try {
        const token =await getToken();
        console.log(token)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/document/${url}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch documents: ${response.statusText}`);
        }

        const data = await response.json();
        const validDocuments = data
          .filter((doc: any) => doc.file_name && doc.category && doc.summary)
          .map((doc: any) => ({
            id: doc.id,
            fileName: doc.file_name,
            category: doc.category,
            createdAt: doc.created_at,
            summary: doc.summary,
            status: doc.status,
          }));

        setDocuments(validDocuments);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    }

    fetchDocuments();
  }, [userRole]);

  const handleStatusChange = (id: number, newStatus: string) => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc) =>
        doc.id === id ? { ...doc, status: newStatus } : doc
      )
    );
  };

  const updateDocumentStatus = async (id: number) => {
    const documentToUpdate = documents.find((doc) => doc.id === id);
    if (!documentToUpdate) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/document/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: documentToUpdate.status }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update status for document ID: ${id}`);
      }

      toast.success("Document status updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update document status!");
    }
  };

  const filteredDocuments = documents.filter(doc =>
    doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedDocuments = filteredDocuments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-red-500">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error.message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <ToastContainer />
      <CardContent>
        <div className="flex justify-between items-center mb-4 mt-4">
          <div className="relative w-64">
            <Input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <Button>Add New Document</Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Filename</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Summary</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.fileName}</TableCell>
                  <TableCell>{doc.category}</TableCell>
                  <TableCell>{new Date(doc.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{doc.summary}</TableCell>
                  <TableCell>
                    {(userRole) === "admin" || (userRole) === "manager" ? (
                      <div className="flex items-center space-x-2">
                        <select
                          value={doc.status}
                          onChange={(e) => handleStatusChange(doc.id, e.target.value)}
                          className="border rounded px-2 py-1 text-sm"
                        >
                          <option value="pending">Pending</option>
                          <option value="under review">Under Review</option>
                          <option value="accepted">Accepted</option>
                          <option value="refused">Refused</option>
                        </select>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateDocumentStatus(doc.id)}
                        >
                          Update
                        </Button>
                      </div>
                    ) : (
                      doc.status
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openDocument(doc.fileName)}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => setCurrentPage(i + 1)}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
}
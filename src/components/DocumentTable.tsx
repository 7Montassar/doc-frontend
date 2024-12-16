'use client'

import React, { useEffect, useState } from 'react'
import { ArrowUpRight, Search, Loader2 } from 'lucide-react'
import { DocumentType } from '@/types/DocumentType'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { openDocument } from './actions'
export default function DocumentTable() {
    const [documents, setDocuments] = useState<DocumentType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const itemsPerPage = 10

    

    useEffect(() => {
        async function fetchDocuments() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/document/`,{cache: "force-cache"});
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);

                // Map API response keys to the expected ones
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
    }, []);

    const handleOpenDocument = async (fileName: string) => {
        try {
                const blob = await openDocument(fileName);
               const url = window.URL.createObjectURL(blob);

                // Open the file in a new window pop-up
                const newWindow = window.open(url);
                if (newWindow) {
                        newWindow.focus();
                } else {
                        throw new Error('Failed to open the document in a new window');
                }

            } catch (error) {
                console.error('Error opening the document:', error);
            }
    };

    const filteredDocuments = documents.filter(doc =>
        doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.summary.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const paginatedDocuments = filteredDocuments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage)

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
        )
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
        )
    }

    return (
        <Card className="w-full">

            <CardContent>
                {message && (
                    <p className="mb-4 p-2 rounded bg-green-100 text-green-800">{message}</p>
                )}
                <div className="flex justify-between items-center mb-4">
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
                                        <Badge variant={doc.status === 'migrated' ? 'secondary' : 'default'}>
                                            {doc.status === 'migrated' ? 'Migrated' : 'Pending'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleOpenDocument(doc.fileName)}
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
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
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
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </CardContent>
        </Card>
    )
}


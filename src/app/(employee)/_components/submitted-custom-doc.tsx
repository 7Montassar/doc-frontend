'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from 'date-fns'
import { Button } from "@/components/ui/button"
import { Download, FileText } from 'lucide-react'
import Image from "next/image"
import { jsPDF } from 'jspdf'
import {handleUpload, handleUploadCustomDoc} from "../action"

interface CustomField {
    id: string
    name: string
    type: 'text' | 'number' | 'date' | 'checkbox' | 'dropdown'
    content: string
    options?: string[]
}

interface SubmittedCustomDocumentProps {
    title: string
    description: string
    documentNumber: number
    customFields: CustomField[]
    theme: 'light' | 'dark'
    accentColor: string
    fontSize: number
    layout: 'single' | 'double'
}

export default function SubmittedCustomDocument({
                                                    title,
                                                    description,
                                                    documentNumber,
                                                    customFields,
                                                    theme,
                                                    accentColor,
                                                    fontSize,
                                                    layout
                                                }: SubmittedCustomDocumentProps) {
    const HandleUpload = async () => {
        try {
            const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

            // Set font styles
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(24);
            pdf.setTextColor(parseInt(accentColor.slice(1, 3), 16), parseInt(accentColor.slice(3, 5), 16), parseInt(accentColor.slice(5, 7), 16));

            // Add title
            pdf.text("DocFlow", 20, 20);

            // Add document number
            pdf.setFontSize(12);
            pdf.setTextColor(128, 128, 128); // Gray color
            pdf.text(`Document #${documentNumber}`, 20, 28);

            // Add document title
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(18);
            pdf.setTextColor(0, 0, 0); // Black color
            pdf.text(title, 20, 40);

            // Add creation date
            pdf.setFontSize(12);
            pdf.text(`Creation Date: ${format(new Date(), 'dd/MM/yyyy')}`, 150, 40, { align: 'right' });

            // Add logo
            const logoUrl = '/logo.png';
            const logoData = await fetch(logoUrl).then(res => res.arrayBuffer());
            const logoFormat = logoUrl.split('.').pop()?.toLowerCase() || 'png';
            pdf.addImage(new Uint8Array(logoData), logoFormat, 170, 10, 20, 20);

            // Add description
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(14);
            pdf.setTextColor(parseInt(accentColor.slice(1, 3), 16), parseInt(accentColor.slice(3, 5), 16), parseInt(accentColor.slice(5, 7), 16));
            pdf.text("Description", 20, 55);
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(12);
            pdf.setTextColor(0, 0, 0); // Black color
            const splitDescription = pdf.splitTextToSize(description, 170);
            pdf.text(splitDescription, 20, 62);

            // Add custom fields
            // pdf.setFont("helvetica", "bold");
            // pdf.setFontSize(14);
            // pdf.setTextColor(parseInt(accentColor.slice(1, 3), 16), parseInt(accentColor.slice(3, 5), 16), parseInt(accentColor.slice(5, 7), 16));
            // pdf.text("Custom Fields", 20, 85);

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(12);
            pdf.setTextColor(0, 0, 0); // Black color

            const createSvgIcon = (path: string) => {
                return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${accentColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
            };

            const fileTextIcon = createSvgIcon('M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2zM14 2v6h6M16 13H8M16 17H8M10 9H8');

            const addIconAndText = (icon: string, text: string, y: number) => {
                pdf.addSvgAsImage(icon, 20, y - 5, 5, 5);
                pdf.text(text, 28, y);
            };

            let yPosition = 95;
            customFields.forEach((field) => {
                addIconAndText(fileTextIcon, `${field.name}: ${field.content}`, yPosition);
                yPosition += 8;
            });

            // Add footer
            pdf.setFontSize(10);
            pdf.setTextColor(128, 128, 128); // Gray color
            pdf.text("This document was created using DocFlow Custom Document Creator.", 20, 280);

            const pdfBlob = pdf.output('blob');

            const formData = new FormData();
            formData.append('file', pdfBlob, `custom_document_${documentNumber}.pdf`);
            formData.append('owner_id', '1');

            await handleUploadCustomDoc(formData);
            console.log('Upload successful');
        } catch (error) {
            console.error('Error creating or uploading the PDF:', error);
        }
    };

    return (
        <div className={`container mx-auto p-4 ${theme === 'dark' ? 'dark bg-gray-900 text-white' : ''}`}>
            <Card className={`max-w-3xl mx-auto ${theme === 'dark' ? 'bg-gray-800 text-white' : ''}`}>
                <CardHeader>
                    <CardTitle className="text-center text-2xl" style={{ color: accentColor }}>Custom Document Created</CardTitle>
                </CardHeader>
                <CardContent>
                    <div id="custom-document-content" className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-3xl font-bold" style={{ color: accentColor }}>DocFlow</h2>
                                <p className="text-sm text-gray-500">Document #{documentNumber}</p>
                            </div>
                            <div className="w-20 h-20 bg-[#FFFFFF] rounded-full flex items-center justify-center">
                                <Image
                                    src="/logo.png"
                                    alt="DocFlow Logo"
                                    width={80}
                                    height={80}
                                    style={{objectFit: 'contain'}}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="font-semibold">Title:</p>
                                <p>{title}</p>
                            </div>
                            <div className="text-right">
                                <p><strong>Creation Date:</strong> {format(new Date(), 'dd/MM/yyyy')}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <FileText className="w-5 h-5 mr-2 mt-1" style={{ color: accentColor }}/>
                                <div>
                                    <p><strong>Description:</strong></p>
                                    <p className="mt-1">{description}</p>
                                </div>
                            </div>
                            {customFields.map((field) => (
                                <div key={field.id} className="flex items-start">
                                    <FileText className="w-5 h-5 mr-2 mt-1" style={{ color: accentColor }}/>
                                    <div>
                                        <p><strong>{field.name}:</strong></p>
                                        <p className="mt-1">{field.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
                <div className="border-t pt-4 mt-4">
                    <p className="text-sm text-gray-500">
                        This document was created using DocFlow Custom Document Creator.
                    </p>
                </div>
                <div className="text-center mt-6 mb-6">
                    <Button onClick={HandleUpload} style={{ backgroundColor: accentColor }}>
                        <Download className="mr-2 h-4 w-4"/> Download Document
                    </Button>
                </div>
            </Card>
        </div>
    )
}


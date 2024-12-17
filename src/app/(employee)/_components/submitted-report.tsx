    'use client'

    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
    import { format } from 'date-fns'
    import { Button } from "@/components/ui/button"
    import { Download, FileText, User, Briefcase, Mail } from 'lucide-react'
    import logo from '@/../public/logo.png'
    import Image from "next/image"
    import { jsPDF } from 'jspdf'
    import { handleUpload } from "../action"

    interface SubmittedReportProps {
        email: string
        department: string
        reportType: string
        subject: string
        description: string
        reportNumber: number
    }

    export default function SubmittedReport({
                                                email,
                                                department,
                                                reportType,
                                                subject,
                                                description,
                                                reportNumber
                                            }: SubmittedReportProps) {
        const handleDownload = async () => {
            try {
                const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

                const reportElement = document.getElementById('report-content');
                if (!reportElement) {
                    throw new Error('Report element not found');
                }

                const reportText = reportElement.innerText || reportElement.textContent;
                if (!reportText) {
                    throw new Error('Report content is empty');
                }

                // Title
                pdf.setFont("helvetica", "bold");
                pdf.setFontSize(24);
                pdf.setTextColor(14, 112, 139); // #0E708B
                pdf.text("DocFlow", 20, 20);

                // Report Number
                pdf.setFontSize(12);
                pdf.setTextColor(128, 128, 128); // Gray color
                pdf.text(`Report #${reportNumber}`, 20, 28);

                // Employee details
                pdf.setFont("helvetica", "normal");
                pdf.setFontSize(12);
                pdf.setTextColor(0, 0, 0); // Black color
                pdf.text(`Submitted by: ${email}`, 20, 40);
                pdf.text(`Department: ${department}`, 20, 48);
                pdf.text(`Report Type: ${reportType}`, 20, 56);
                pdf.text(`Subject: ${subject}`, 20, 64);
                pdf.text(`Description:`, 20, 72);

                // Multiline description
                const splitDescription = pdf.splitTextToSize(description, 162);
                pdf.text(splitDescription, 28, 80);

                // Date
                pdf.text(`Submission Date: ${format(new Date(), 'dd/MM/yyyy')}`, 200, 40, { align: 'right' });

                // Footer
                pdf.setFontSize(10);
                pdf.setTextColor(128, 128, 128); // Gray color
                pdf.text("This report has been successfully submitted. It will be reviewed by the appropriate department.", 20, 280);

                const pdfBlob = pdf.output('blob');

                const formData = new FormData();
                formData.append('file', pdfBlob, `report_${reportNumber}.pdf`);
                formData.append('owner_id', '1');

                await handleUpload(formData);
                console.log('Upload successful');
            } catch (error) {
                console.error('Error creating or uploading the PDF:', error);
            }
        };


        return (
            <div className="container mx-auto p-4">
                <Card className="max-w-3xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl text-[#0E708B]">Report Submitted Successfully</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div id="report-content" className="space-y-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-3xl font-bold text-[#0E708B]">DocFlow</h2>
                                    <p className="text-sm text-gray-500">Report #{reportNumber}</p>
                                </div>
                                <div className="w-20 h-20 bg-[#FFFFFF] rounded-full flex items-center justify-center">
                                    <Image
                                        src={logo}
                                        alt="DocFlow Logo"
                                        width={120}
                                        height={120}
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="font-semibold">Submitted by:</p>
                                    <p>{email}</p>
                                </div>
                                <div className="text-right">
                                    <p><strong>Submission Date:</strong> {format(new Date(), 'dd/MM/yyyy')}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <Mail className="w-5 h-5 mr-2 text-[#0E708B]" />
                                    <p><strong>Email:</strong> {email}</p>
                                </div>
                                <div className="flex items-center">
                                    <Briefcase className="w-5 h-5 mr-2 text-[#0E708B]" />
                                    <p><strong>Department:</strong> {department}</p>
                                </div>
                                <div className="flex items-center">
                                    <FileText className="w-5 h-5 mr-2 text-[#0E708B]" />
                                    <p><strong>Report Type:</strong> {reportType}</p>
                                </div>
                                <div className="flex items-start">
                                    <User className="w-5 h-5 mr-2 mt-1 text-[#0E708B]" />
                                    <div>
                                        <p><strong>Subject:</strong></p>
                                        <p className="mt-1">{subject}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <FileText className="w-5 h-5 mr-2 mt-1 text-[#0E708B]" />
                                    <div>
                                        <p><strong>Description:</strong></p>
                                        <p className="mt-1">{description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="border-t pt-4 mt-4">
                                <p className="text-sm text-gray-500">
                                    This report has been successfully submitted. It will be reviewed by the appropriate department.
                                </p>
                            </div>
                        </div>
                        <div className="text-center mt-6">
                            <Button onClick={handleDownload} className="bg-[#0E708B] hover:bg-[#0A5A6F]">
                                <Download className="mr-2 h-4 w-4" /> Submit Report
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

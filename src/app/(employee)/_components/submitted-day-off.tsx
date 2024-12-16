'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from 'date-fns'
import { Button } from "@/components/ui/button"
import { Download, Calendar, User, FileText } from 'lucide-react'
import Image from "next/image"
import { jsPDF } from 'jspdf'
import { handleUpload } from "../action"

interface SubmittedDayOffProps {
    employeeName: string
    employeeEmail: string
    startDate: Date
    endDate: Date
    reason: string
    description: string
    requestNumber: number
}

export default function SubmittedDayOff({
                                            employeeName,
                                            employeeEmail,
                                            startDate,
                                            endDate,
                                            reason,
                                            description,
                                            requestNumber
                                        }: SubmittedDayOffProps) {
    const HandleUpload = async () => {
        try {
            const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

            // Set font styles
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(24);
            pdf.setTextColor(14, 112, 139); // #0E708B

            // Add title
            pdf.text("DocFlow", 20, 20);

            // Add request number
            pdf.setFontSize(12);
            pdf.setTextColor(128, 128, 128); // Gray color
            pdf.text(`Request #${requestNumber}`, 20, 28);

            // Add employee details
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(12);
            pdf.setTextColor(0, 0, 0); // Black color
            pdf.text(`Employee: ${employeeName}`, 20, 40);
            pdf.text(`Email: ${employeeEmail}`, 20, 48);

            // Add request date
            pdf.text(`Request Date: ${format(new Date(), 'dd/MM/yyyy')}`, 150, 40, { align: 'right' });

            // Add logo
            const logoUrl = '/logo.png';
            const logoData = await fetch(logoUrl).then(res => res.arrayBuffer());
            const logoFormat = logoUrl.split('.').pop()?.toLowerCase() || 'png';
            pdf.addImage(new Uint8Array(logoData), logoFormat, 170, 10, 20, 20);

            // Add day off details with icons
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(14);
            pdf.setTextColor(14, 112, 139); // #0E708B
            pdf.text("Day Off Request Details", 20, 60);

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(12);
            pdf.setTextColor(0, 0, 0); // Black color

            const createSvgIcon = (path: string) => {
                return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0E708B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
            };

            const calendarIcon = createSvgIcon('M8 2v3M16 2v3M3 8h18M19 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z');
            const userIcon = createSvgIcon('M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z');
            const fileTextIcon = createSvgIcon('M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2zM14 2v6h6M16 13H8M16 17H8M10 9H8');

            const addIconAndText = (icon: string, text: string, y: number) => {
                pdf.addSvgAsImage(icon, 20, y - 5, 5, 5);
                pdf.text(text, 28, y);
            };

            addIconAndText(calendarIcon, `Start Date: ${format(startDate, 'dd/MM/yyyy')}`, 70);
            addIconAndText(calendarIcon, `End Date: ${format(endDate, 'dd/MM/yyyy')}`, 78);
            addIconAndText(userIcon, `Reason: ${reason}`, 86);
            addIconAndText(fileTextIcon, "Description:", 94);

            // Add multiline description
            const splitDescription = pdf.splitTextToSize(description, 162);
            pdf.text(splitDescription, 28, 102);

            // Add footer
            pdf.setFontSize(10);
            pdf.setTextColor(128, 128, 128); // Gray color
            pdf.text("This request is pending approval. You will be notified once it has been reviewed.", 20, 280);

            const pdfBlob = pdf.output('blob');

            const formData = new FormData();
            formData.append('file', pdfBlob, `day_off_request_${requestNumber}.pdf`);
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
                    <CardTitle className="text-center text-2xl text-[#0E708B]">Day Off Request Submitted</CardTitle>
                </CardHeader>
                <CardContent>
                    <div id="day-off-content" className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-[#0E708B]">DocFlow</h2>
                                <p className="text-sm text-gray-500">Request #{requestNumber}</p>
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
                                <p className="font-semibold">Employee:</p>
                                <p>{employeeName}</p>
                                <p>{employeeEmail}</p>
                            </div>
                            <div className="text-right">
                                <p><strong>Request Date:</strong> {format(new Date(), 'dd/MM/yyyy')}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <Calendar className="w-5 h-5 mr-2 text-[#0E708B]"/>
                                <p><strong>Start Date:</strong> {format(startDate, 'dd/MM/yyyy')}</p>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="w-5 h-5 mr-2 text-[#0E708B]"/>
                                <p><strong>End Date:</strong> {format(endDate, 'dd/MM/yyyy')}</p>
                            </div>
                            <div className="flex items-center">
                                <User className="w-5 h-5 mr-2 text-[#0E708B]"/>
                                <p><strong>Reason:</strong> {reason}</p>
                            </div>
                            <div className="flex items-start">
                                <FileText className="w-5 h-5 mr-2 mt-1 text-[#0E708B]"/>
                                <div>
                                    <p><strong>Description:</strong></p>
                                    <p className="mt-1">{description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <div className="border-t pt-4 mt-4">
                    <p className="text-sm text-gray-500">
                        This request is pending approval. You will be notified once it has been reviewed.
                    </p>
                </div>
                <div className="text-center mt-6">
                    <Button onClick={HandleUpload} className="bg-[#0E708B] hover:bg-[#0A5A6F]">
                        <Download className="mr-2 h-4 w-4"/> Download Request
                    </Button>
                </div>
            </Card>
        </div>
    )
}


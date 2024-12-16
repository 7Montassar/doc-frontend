'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from 'date-fns'
import { Button } from "@/components/ui/button"
import { Download, Calendar, User, FileText } from 'lucide-react'
import logo from '@/../public/logo.png'
import Image from "next/image"
import { jsPDF } from 'jspdf'
import { handleUpload } from "../action"
import html2canvas from 'html2canvas'

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

            const dayOffElement = document.getElementById('day-off-content');
            if (!dayOffElement) {
                throw new Error('Day off element not found');
            }

            const dayOffText = dayOffElement.innerText || dayOffElement.textContent;
            if (!dayOffText) {
                throw new Error('Day off content is empty');
            }

            pdf.text(dayOffText, 10, 10);

            const canvas = await html2canvas(dayOffElement);
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 10, 20, 190, 150);

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
                                <Calendar className="w-5 h-5 mr-2 text-[#0E708B]" />
                                <p><strong>Start Date:</strong> {format(startDate, 'dd/MM/yyyy')}</p>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="w-5 h-5 mr-2 text-[#0E708B]" />
                                <p><strong>End Date:</strong> {format(endDate, 'dd/MM/yyyy')}</p>
                            </div>
                            <div className="flex items-center">
                                <User className="w-5 h-5 mr-2 text-[#0E708B]" />
                                <p><strong>Reason:</strong> {reason}</p>
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
                                This request is pending approval. You will be notified once it has been reviewed.
                            </p>
                        </div>
                    </div>
                    <div className="text-center mt-6">
                        <Button onClick={HandleUpload} className="bg-[#0E708B] hover:bg-[#0A5A6F]">
                            <Download className="mr-2 h-4 w-4" /> Download Request
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}


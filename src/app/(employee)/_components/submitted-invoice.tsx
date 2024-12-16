import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from 'date-fns'
import { Button } from "@/components/ui/button"
import { Download } from 'lucide-react'
import logo from '@/../public/logo.png'
import Image from "next/image"
import { jsPDF } from 'jspdf';
import { handleUpload } from "../action"
import { ca } from "date-fns/locale"


interface Product {
  name: string
  quantity: number
  price: number
}

interface SubmittedInvoiceProps {
  clientName: string
  clientEmail: string
  dueDate?: Date
  products: Product[]
  tva: number
  invoiceNumber: number
}

export default function SubmittedInvoice({ clientName, clientEmail, dueDate, products, tva, invoiceNumber }: SubmittedInvoiceProps) {
  const subtotal = products.reduce((sum, product) => sum + product.quantity * product.price, 0)
  const tvaAmount = subtotal * (tva / 100)
  const total = subtotal + tvaAmount
  const HandleUpload = async () => {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
      floatPrecision: 'smart',
    });
    
    // Add content to the PDF
    pdf.setFontSize(18);
    pdf.text('invoice', 105, 15, { align: 'center' });
    pdf.setFontSize(12);
    pdf.text(`Invoice #${invoiceNumber}`, 20, 30);
    pdf.text(`Date: ${format(new Date(), 'dd/MM/yyyy')}`, 20, 40);
    pdf.text(`Due Date: ${dueDate ? format(dueDate, 'dd/MM/yyyy') : 'Not set'}`, 20, 50);
    pdf.text(`Client: ${clientName}`, 20, 60);
    pdf.text(`Email: ${clientEmail}`, 20, 70);
    
    // Add products table
    let yPos = 90;
    pdf.text('Product', 20, yPos);
    pdf.text('Quantity', 80, yPos);
    pdf.text('Price', 120, yPos);
    pdf.text('Total', 160, yPos);
    yPos += 10;
    
    products.forEach((product) => {
      pdf.text(product.name, 20, yPos);
      pdf.text(product.quantity.toString(), 80, yPos);
      pdf.text(`$${product.price.toFixed(2)}`, 120, yPos);
      pdf.text(`$${(product.quantity * product.price).toFixed(2)}`, 160, yPos);
      yPos += 10;
    });
    
    // Add totals
    yPos += 10;
    pdf.text(`Subtotal: $${subtotal.toFixed(2)}`, 120, yPos);
    yPos += 10;
    pdf.text(`TVA (${tva}%): $${tvaAmount.toFixed(2)}`, 120, yPos);
    yPos += 10;
    pdf.text(`Total: $${total.toFixed(2)}`, 120, yPos, { align: 'right' });
    
    // Convert PDF to blob
    const pdfBlob = await pdf.output('blob');
    
    // Create FormData and append the PDF
    const formData = new FormData();
    formData.append('file', pdfBlob, `invoice_${invoiceNumber}.pdf`);
    formData.append('owner_id', '1'); // Example metadata
    
    // Send the request
    try {
        await handleUpload(formData);
        console.log('Upload successful:');}
    catch (error) {
        console.error('Error uploading the file:', error);
    }




}
 

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-[#0E708B]">Invoice Generated Successfully</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-[#0E708B]">DocFlow</h2>
                <p className="text-sm text-gray-500">Invoice #{invoiceNumber}</p>
              </div>
              <div className="w-20 h-20 bg-[#FFFFFF] rounded-full flex items-center justify-center">
              <Image 
    src={logo} 
    alt="DocFlow Logo" 
    width={120} 
    height={120} 
    style={{ objectFit: 'cover' }} // Ensuring the logo fits within its dimensions
  />
</div>

            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Bill To:</p>
                <p>{clientName}</p>
                <p>{clientEmail}</p>
              </div>
              <div className="text-right">
                <p><strong>Invoice Date:</strong> {format(new Date(), 'dd/MM/yyyy')}</p>
                <p><strong>Due Date:</strong> {dueDate ? format(dueDate, 'dd/MM/yyyy') : 'Not set'}</p>
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#0E708B]">
                  <th className="text-left py-2">Product</th>
                  <th className="text-right py-2">Quantity</th>
                  <th className="text-right py-2">Price</th>
                  <th className="text-right py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{product.name}</td>
                    <td className="text-right py-2">{product.quantity}</td>
                    <td className="text-right py-2">${product.price.toFixed(2)}</td>
                    <td className="text-right py-2">${(product.quantity * product.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="space-y-2">
              <p className="text-right"><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
              <p className="text-right"><strong>TVA ({tva}%):</strong> ${tvaAmount.toFixed(2)}</p>
              <p className="text-right text-xl font-bold"><strong>Total:</strong> ${total.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <Button onClick={HandleUpload} className="bg-[#0E708B] hover:bg-[#0A5A6F]">
                <Download className="mr-2 h-4 w-4" /> Upload Invoice
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


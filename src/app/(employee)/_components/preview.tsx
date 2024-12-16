import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from 'date-fns'
import logo from '@/../public/logo.png'
import Image from "next/image"
interface Product {
  name: string
  quantity: number
  price: number
}

interface PreviewProps {
  clientName: string
  clientEmail: string
  dueDate?: Date
  products: Product[]
  tva: number
  invoiceNumber: number
}

export default function Preview({ clientName, clientEmail, dueDate, products, tva, invoiceNumber }: PreviewProps) {
  const subtotal = products.reduce((sum, product) => sum + product.quantity * product.price, 0)
  const tvaAmount = subtotal * (tva / 100)
  const total = subtotal + tvaAmount

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-[#0E708B]">DocFlow</h2>
              <p className="text-sm text-gray-500">Invoice #{invoiceNumber ? invoiceNumber : 'Generating...'}</p>
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
          <div>
            <p><strong>Client:</strong> {clientName}</p>
            <p><strong>Email:</strong> {clientEmail}</p>
          </div>
          <div>
            <p><strong>Invoice Date:</strong> {format(new Date(), 'dd/MM/yyyy')}</p>
            <p><strong>Due Date:</strong> {dueDate ? format(dueDate, 'dd/MM/yyyy') : 'Not set'}</p>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left">Product</th>
                <th className="text-right">Quantity</th>
                <th className="text-right">Price</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} className="border-b">
                  <td>{product.name}</td>
                  <td className="text-right">{product.quantity}</td>
                  <td className="text-right">${product.price.toFixed(2)}</td>
                  <td className="text-right">${(product.quantity * product.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="space-y-2">
            <p className="text-right"><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
            <p className="text-right"><strong>TVA ({tva}%):</strong> ${tvaAmount.toFixed(2)}</p>
            <p className="text-right text-xl font-bold"><strong>Total:</strong> ${total.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


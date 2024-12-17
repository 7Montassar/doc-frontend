'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ProductList from '../_components/product-list'
import Preview from '../_components/preview'
import SubmittedInvoice from '../_components/submitted-invoice'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Navbar from '@/components/Navbar'
export default function InvoiceForm() {
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [dueDate, setDueDate] = useState<Date>()
  const [products, setProducts] = useState([{ name: '', quantity: 0, price: 0 }])
  const [tva, setTva] = useState(20)
  const [invoiceNumber, setInvoiceNumber] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setInvoiceNumber(Math.floor(Math.random() * 1000000))
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return <SubmittedInvoice 
      clientName={clientName}
      clientEmail={clientEmail}
      dueDate={dueDate}
      products={products}
      tva={tva}
      invoiceNumber={invoiceNumber ?? 0}
    />
  }

  return (
    <div className="container mx-auto p-4">
                  <Navbar />

      <h1 className="text-3xl font-bold text-center mb-8 text-[#0E708B]">DocFlow Invoice Generator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Invoice Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="clientName">Client Name</Label>
                <Input id="clientName" value={clientName} onChange={(e) => setClientName(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="clientEmail">Client Email</Label>
                <Input id="clientEmail" type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal ${!dueDate && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={setDueDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <ProductList products={products} setProducts={setProducts} />
              <div>
                <Label htmlFor="tva">TVA (%)</Label>
                <Input id="tva" type="number" value={tva} onChange={(e) => setTva(Number(e.target.value))} required />
              </div>
              <Button type="submit" className="w-full bg-[#0E708B] hover:bg-[#0A5A6F]">Generate Invoice</Button>
            </form>
          </CardContent>
        </Card>
        <Preview
          clientName={clientName}
          clientEmail={clientEmail}
          dueDate={dueDate}
          products={products}
          tva={tva}
          invoiceNumber={invoiceNumber ?? 0}
        />
      </div>
    </div>
  )
}

